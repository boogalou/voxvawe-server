import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserProfileEntity } from "./entity/user-profile.entity";
import { UserProfileController } from "./user-profile.controller";
import { UserProfileService } from "./user-profile.service";
import { UserEntity } from "../user/entity/user.entity";
import { UserModule } from "../user/user.module";
import { VkModule } from "../vk/vk.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserProfileEntity, UserEntity] ),
  ],
  controllers: [UserProfileController],
  providers: [UserProfileService],
  exports: [UserProfileService],
})
export class UserProfileModule {
}
