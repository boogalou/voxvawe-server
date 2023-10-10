import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "../user/entity/user.entity";
import { Repository } from "typeorm";
import { UserProfileEntity } from "./entity/user-profile.entity";
import { UserProfileDto } from "./dto/user-profile.dto";
import { UserService } from "../user/user.service";

@Injectable()
export class UserProfileService {

  constructor(
    @InjectRepository(UserProfileEntity)
    private readonly userProfileRepository: Repository<UserProfileEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {
  }

  async createUserProfile(user: UserEntity) {
    const newUserProfile = new UserProfileEntity();
    newUserProfile.email = user.email;
    newUserProfile.username = user.username;
    const modUser = new UserEntity();
    modUser.id = user.id;
    newUserProfile.user = modUser;

    const createdUserProfile = await this.userProfileRepository.save(newUserProfile);
    return createdUserProfile;
  }

  async editProfile(accountId: string, userProfileDto: UserProfileDto) {
    const user = await this.userRepository.findOne({ where: { account_id: accountId } });

    if (user) {
      const userProfile = await this.userProfileRepository.findOne({where: {user: { id: user.id }}})

      const updatedProfile: UserProfileEntity = {
        ...userProfile,
        email: userProfileDto.email || userProfile.email,
        username: userProfileDto.username || userProfile.username,
        bio: userProfileDto.bio || userProfile.bio
      };

      const savedProfile = await this.userProfileRepository.save(updatedProfile);




      if (userProfileDto.email) {
        user.email = userProfileDto.email;
      }

      if (userProfileDto.username) {
        user.username = userProfileDto.username;
      }




      const updatedUser = await this.userRepository.save(user);
      return updatedUser;
    } else {
      throw new Error("Пользователь не найден");
    }

  }

};
