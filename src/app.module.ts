import { MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { databaseConfig } from "./config/database.config";
import { ConfigModule } from "@nestjs/config";
import { AppGateway } from "./app.gateway";
import { UserModule } from "./user/user.module";
import { TokenModule } from "./token/token.module";
import { MailerModule } from "@nestjs-modules/mailer";
import { mailerConfig } from "./config/mailer.config";
import { MailModule } from "./mail/mail.module";
import { AuthMiddleware } from "./middleware/auth.middleware";
import { DialogModule } from "./dialog/dialog.module";
import { UserProfileModule } from "./user-profile/user-profile.module";
import { ContactModule } from "./contact/contact.module";
import { MessageModule } from "./message/message.module";
import { VkModule } from "./vk/vk.module";
import { UploadModule } from './upload/upload.module';
import { UserEntity } from "./user/entity/user.entity";
import { RedisModule } from './redis/redis.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync(databaseConfig),
    MailerModule.forRootAsync(mailerConfig),
    TypeOrmModule.forFeature([UserEntity]),
    UserModule,
    TokenModule,
    MailModule,
    DialogModule,
    UserProfileModule,
    ContactModule,
    MessageModule,
    VkModule,
    UploadModule,
    RedisModule,
  ],
  providers: [AppGateway],
  controllers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: "*",
      method: RequestMethod.ALL
    })
  }
}
