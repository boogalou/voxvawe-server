import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res, UploadedFile,
  UseGuards, UseInterceptors,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserResponse } from "../types/user-response.interface";
import { LoginUserDto } from "./dto/login-user.dto";
import { Request, Response } from "express";
import { LIFE_RANGE } from "./constants";
import { Cookies } from "../middleware/cookies.middleware";
import { AuthGuard } from "./guard/auth.guard";
import { ConfigService } from "@nestjs/config";
import { UserEntity } from "./entity/user.entity";
import { FileInterceptor } from "@nestjs/platform-express";


@Controller()
export class UserController {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService
  ) {
  }

  private setRefreshTokenCookie(res: Response, refreshToken: string) {
    res.cookie("refreshToken", refreshToken, {
      maxAge: LIFE_RANGE,
      httpOnly: true
    });
  }

  @Post("register")
  @UsePipes(new ValidationPipe())
  async create(
    @Body("user") createUserDto: CreateUserDto,
    @Res() res: Response
  ): Promise<UserResponse> {
    const user = await this.userService.create(createUserDto);
    const userResponse = await this.userService.responseUserBuilder(user);
    this.setRefreshTokenCookie(res, userResponse.user.refresh_token);
    delete userResponse.user.refresh_token;
    res.send(userResponse);
    return;
  }

  @Post("login")
  @UsePipes(new ValidationPipe())
  async login(
    @Body("user") loginUserDto: LoginUserDto,
    @Res() res: Response
  ) {
    const user = await this.userService.login(loginUserDto);
    const userResponse = await this.userService.responseUserBuilder(user);
    this.setRefreshTokenCookie(res, userResponse.user.refresh_token);
    delete userResponse.user.refresh_token;
    console.log(userResponse);
    res.send(userResponse);
  }

  @Post("logout")
  async logout(
    @Cookies("refreshToken") refreshToken: string,
    @Res() res: Response
  ) {
    const token = await this.userService.logout(refreshToken);
    res.clearCookie("refreshToken");
    res.setHeader("Authorization", "");
    res.send(token);
  }

  @Get("activate/:link")
  async activate(
    @Param("link") link: string,
    @Res() res: Response) {
    await this.userService.activate(link);
    const clientUrl = this.configService.get("CLIENT_URL");
    res.redirect(clientUrl + "/auth/signing/");
  }

  @Get("refresh")
  async refresh(
    @Cookies("refreshToken") refreshToken: string,
    @Res() res: Response) {
    const user = await this.userService.refresh(refreshToken, "refresh");
    const userResponse = await this.userService.responseUserBuilder(user, false);
    delete userResponse.user.refresh_token;
    res.send(userResponse);
  }

  @Get("users")
  @UseGuards(AuthGuard)
  async getCurrentUser(@Req() req: Request, @Res() res: Response) {
    const token = req.headers.authorization;
    const response = await this.userService.getCurrentUser(token);
    res.send(response);
  }

  @Post("update-avatar/:id")
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor("file"))
  async updateProfileImage(
    @UploadedFile() file: Express.Multer.File,
    @Param("id") id: string,
    @Res() res: Response) {
    const response = await this.userService.updateAvatar(id, file);
    res.send(response);
  }
}
