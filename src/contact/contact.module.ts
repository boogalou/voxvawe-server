import { Module } from "@nestjs/common";
import { ContactService } from "./contact.service";
import { ContactController } from "./contact.controller";
import { ContactGateway } from "./contact.gateway";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "../user/entity/user.entity";
import { DialogEntity } from "../dialog/entity/dialog.entity";
import { DialogModule } from "../dialog/dialog.module";


@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, DialogEntity]), DialogModule],
  providers: [ContactService, ContactGateway],
  controllers: [ContactController]
})
export class ContactModule {}
