import { Module } from "@nestjs/common";
import { MessageService } from "./message.service";
import { MessageGateway } from "./message.gateway";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MessageEntity } from "./entity/message.entity";
import { DialogEntity } from "../dialog/entity/dialog.entity";
import { UserEntity } from "../user/entity/user.entity";
import { MessageController } from "./message.controller";
import { RedisModule } from "../redis/redis.module";

@Module({
  imports: [TypeOrmModule.forFeature([MessageEntity, UserEntity, DialogEntity]), RedisModule],
  providers: [MessageService, MessageGateway],
  exports: [MessageService],
  controllers: [MessageController],

})
export class MessageModule {}
