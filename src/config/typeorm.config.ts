import { ConfigService } from "@nestjs/config";
import { DataSource } from "typeorm";
import { config } from "dotenv";
import { UserEntity } from "../user/entity/user.entity";
import { TokenEntity } from "../token/entity/token.entity";
import { DialogEntity } from "../dialog/entity/dialog.entity";
import { UserProfileEntity } from "../user-profile/entity/user-profile.entity";
import { CreateUserAndTokensTable1679253035716 } from "../migrations/1679253035716-CreateUserAndTokensTable";
import { AddFieldAccountIdToUsers1680620345458 } from "../migrations/1680620345458-AddFieldAccountIdToUsers";
import { CreateDialog1680737183255 } from "../migrations/1680737183255-CreateDialog";
import { CreateUserProfile1680872111929 } from "../migrations/1680872111929-CreateUserProfile";
import { AddFieldLastSeenToUser1682854003583 } from "../migrations/1682854003583-AddFieldLastSeenToUser";
import { FixFieldsUser1682865163644 } from "../migrations/1682865163644-FixFieldsUser";
import { FixFieldsAllTables1682866527607 } from "../migrations/1682866527607-FixFieldsAllTables";
import { FixFieldCreatedAt1683727861894 } from "../migrations/1683727861894-FixFieldCreatedAt";
import { UserOntToOne1683780627900 } from "../migrations/1683780627900-UserOntToOne";
import { AddRelationsUser1684443914723 } from "../migrations/1684443914723-AddRelationsUser";
import { AvatarFieldMoveToUserEntity1684485340464 } from "../migrations/1684485340464-AvatarFieldMoveToUserEntity";
import { MessageEntity } from "../message/entity/message.entity";
import { AddMessageEnitiy1685512718554 } from "../migrations/1685512718554-AddMessageEnitiy";
import { AddFieldOwnerIdToDialogEntity1685571223943 } from "../migrations/1685571223943-AddFieldOwnerIdToDialogEntity";
import { DeleteAccountIdField1687473850990 } from "../migrations/1687473850990-DeleteAccountIdField";
import { UpdateDialog1687546978033 } from "../migrations/1687546978033-UpdateDialog";
import { UpdateDialogTwo1687568931346 } from "../migrations/1687568931346-UpdateDialogTwo";
import { UpdateDialogThree1687599315860 } from "../migrations/1687599315860-UpdateDialogThree";
import { UpdateMessageEntity1687733022782 } from "../migrations/1687733022782-UpdateMessageEntity";
import { UpdateMessageEntity1687735975334 } from "../migrations/1687735975334-UpdateMessageEntity";
import { UpdateMessageEntity1688146078077 } from "../migrations/1688146078077-UpdateMessageEntity";
import { UpdateMessageEntity1688152706347 } from "../migrations/1688152706347-UpdateMessageEntity";
import { UpdateMessageEntity1688153442179 } from "../migrations/1688153442179-UpdateMessageEntity";
import { Update_11688200818844 } from "../migrations/1688200818844-Update_1";
import { UpdateAllTables } from "../migrations/1688210138959-UpdateAllTables";
import { MessageEntityUpdate1688416059327 } from "../migrations/1688416059327-MessageEntityUpdate";
import { MessageEntityUpdate1688494970197 } from "../migrations/1688494970197-MessageEntityUpdate";
import { AddFieldsToDialogs1691239750838 } from "../migrations/1691239750838-AddFieldsToDialogs";
import { AddFieldsToDialogs1691240845591 } from "../migrations/1691240845591-AddFieldsToDialogs";
import { AddVoiceMessageField1694279129851 } from "../migrations/1694279129851-AddVoiceMessageField";

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.get('DB_HOST'),
  port: parseInt(configService.get('DB_PORT')),
  username: configService.get('DB_USER'),
  password: configService.get('DB_PASS'),
  database: configService.get('DB_NAME'),
  entities: [
    UserEntity,
    TokenEntity,
    DialogEntity,
    UserProfileEntity,
    MessageEntity
  ],
  migrations: [
    CreateUserAndTokensTable1679253035716,
    AddFieldAccountIdToUsers1680620345458,
    CreateDialog1680737183255,
    CreateUserProfile1680872111929,
    AddFieldLastSeenToUser1682854003583,
    FixFieldsUser1682865163644,
    FixFieldsAllTables1682866527607,
    FixFieldCreatedAt1683727861894,
    UserOntToOne1683780627900,
    AddRelationsUser1684443914723,
    AvatarFieldMoveToUserEntity1684485340464,
    AddMessageEnitiy1685512718554,
    AddFieldOwnerIdToDialogEntity1685571223943,
    DeleteAccountIdField1687473850990,
    UpdateDialog1687546978033,
    UpdateDialogTwo1687568931346,
    UpdateDialogThree1687599315860,
    UpdateMessageEntity1687733022782,
    UpdateMessageEntity1687735975334,
    UpdateMessageEntity1688146078077,
    UpdateMessageEntity1688152706347,
    UpdateMessageEntity1688153442179,
    Update_11688200818844,
    UpdateAllTables,
    MessageEntityUpdate1688416059327,
    MessageEntityUpdate1688494970197,
    AddFieldsToDialogs1691239750838,
    AddFieldsToDialogs1691240845591,
    AddVoiceMessageField1694279129851,
  ],
});
