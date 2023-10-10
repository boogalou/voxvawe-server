import { MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./entity/user.entity";
import { RefreshTokenExceptionMiddleware } from "../middleware/refresh-token.middleware";
import { UserProfileEntity } from "../user-profile/entity/user-profile.entity";
import { TokenEntity } from "../token/entity/token.entity";
import { UserProfileModule } from "../user-profile/user-profile.module";
import { TokenModule } from "../token/token.module";
import { MailModule } from "../mail/mail.module";
import { VkModule } from "../vk/vk.module";


@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, UserProfileEntity, TokenEntity]),
    UserProfileModule,
    TokenModule,
    MailModule,
    VkModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RefreshTokenExceptionMiddleware).forRoutes({
      path: 'refresh',
      method: RequestMethod.ALL
    })
  }
}

