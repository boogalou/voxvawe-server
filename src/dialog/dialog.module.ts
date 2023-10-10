import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DialogEntity } from "./entity/dialog.entity";
import { DialogService } from "./dialog.service";
import { DialogController } from "./dialog.controller";
import { UserEntity } from "../user/entity/user.entity";
import { DialogGateway } from "./dialog.gateway";
import { UserModule } from "../user/user.module";
import { UserService } from "../user/user.service";
import { RedisModule } from "../redis/redis.module";


@Module({
  imports: [
    TypeOrmModule.forFeature([DialogEntity, UserEntity]), UserModule, RedisModule
  ],
  controllers: [DialogController],
  providers: [DialogService, DialogGateway],
  exports: [DialogService, DialogGateway]
})
export class DialogModule {
}
