import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./entity/user.entity";
import { Repository } from "typeorm";
import { UserResponse } from "../types/user-response.interface";
import { TokenService } from "../token/token.service";
import { MailService } from "../mail/mail.service";
import { verify } from "jsonwebtoken";
import { LoginUserDto } from "./dto/login-user.dto";
import { compare } from "bcrypt";
import { idGenerator } from "./util/id-generator";
import { ConfigService } from "@nestjs/config";
import { UserProfileService } from "../user-profile/user-profile.service";
import { decodeToken } from "../util/decode-token";
import { JwtUserData } from "../types/jwt-user-data.interface";
import { VkService } from "../vk/vk.service";


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly tokenService: TokenService,
    private readonly mailService: MailService,
    private readonly configService: ConfigService,
    private readonly userProfileService: UserProfileService,
    private readonly vkService: VkService
  ) {
  }

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const userEmail = await this.userRepository.findOne({
      where: { email: createUserDto.email }
    });

    if (userEmail) {
      throw new HttpException({
          statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
          message: "Пользователь с таким email eже существует",
          time: new Date().toISOString()
        }, HttpStatus.UNPROCESSABLE_ENTITY
      );
    }

    const newUser = new UserEntity();
    Object.assign(newUser, createUserDto);
    newUser.account_id = idGenerator(createUserDto.email);
    const linkToken = this.tokenService.generateLinkToken(newUser.account_id);
    await this.mailService.sendActivationMail(newUser.email, linkToken);
    const createdUser = await this.userRepository.save(newUser);

    createdUser.userProfile = await this.userProfileService.createUserProfile(createdUser);
    await this.userRepository.save(createdUser);

    return createdUser;
  }

  async activate(link: string) {
    const jwtPayload = verify(link, this.configService.get("JWT_LINK_SECRET"));
    const user = await this.userRepository.findOne({ where: { account_id: jwtPayload["accountId"] } });
    if (!user) {
      console.error("незивестаная ошибка");
    }
    user.is_activated = true;
    await this.userRepository.save({ ...user });
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.userRepository.findOne({
      where: {
        email: loginUserDto.email
      },
      select: ["id", "account_id", "avatar", "email", "username", "password", "is_activated"]
    });


    if (!user) {
      throw new HttpException({
          statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
          message: "Некорректные email или пароль.",
          time: new Date().toISOString()
        }, HttpStatus.UNPROCESSABLE_ENTITY
      );
    }

    const isPassCorrect = await compare(loginUserDto.password, user.password);

    if (!isPassCorrect) {
      throw new HttpException("Некорректные email или пароль. Проверьте правильность введенных данных.", HttpStatus.UNPROCESSABLE_ENTITY);
    }

    if (!user.is_activated) {
      throw new HttpException({
        statusCode: HttpStatus.FORBIDDEN,
        message: "Email not verified",
        time: new Date().toISOString()
      }, HttpStatus.FORBIDDEN);
    }

    if (user) {
      user.last_seen = new Date();
      await this.userRepository.save(user);
    }

    delete user.password;
    return user;
  }

  async logout(refreshToken: string) {
    return await this.tokenService.removeToken(refreshToken);
  }

  async refresh(token: string, typeToken: string) {
    const userData = await this.tokenService.validateToken(token, typeToken) as JwtUserData;
    const refreshToken = await this.tokenService.findToken(token);

    if (!userData || !refreshToken) {
      throw new HttpException("Токен или ID не найден", HttpStatus.UNPROCESSABLE_ENTITY);
    }

    const user = await this.userRepository.findOne({
      where: { id: userData.id }
    });

    return user;
  }

  async getCurrentUser(token) {
    const jwtPayload = decodeToken(token) as JwtUserData;
    const currentUSer = await this.userRepository.findOne(
      {
        where: { id: jwtPayload.id },
        relations: ["contacts"]
      });

    return currentUSer;
  }

  async findUserById(userId: number | string): Promise<UserEntity> {
    try {
      if (typeof userId === "number") {
        return await this.userRepository.findOne({ where: { id: userId } });
      }
      return await this.userRepository.findOne({ where: { account_id: userId } });
    } catch (e) {
      console.error(e);
      throw new Error("Ошибка при поиске в метде findById UserService");
    }
  }

  async updateAvatar(id: string, file: Express.Multer.File) {
    const imageResponse = await this.vkService.uploadImage(file);
    const user = await this.findUserById(id);

    if (!user) {
      console.log("Пользователь не найден");
    }

    user.avatar = imageResponse[0].largeSizeUrl;
    const updatedUser = await this.userRepository.save(user)
    return updatedUser;
  }

  async responseUserBuilder(user: UserEntity, saveToken = true): Promise<UserResponse> {
    const accessToken = this.tokenService.accessTokenGenerator(user);

    let refreshToken = null;

    if (saveToken) {
      refreshToken = this.tokenService.refreshTokenGenerator(user);
      const payload = await this.tokenService.saveToken(user.id, refreshToken);
    }

    delete user.password;
    return {
      user: {
        ...user,
        access_token: accessToken,
        refresh_token: refreshToken
      }
    };
  }
}
