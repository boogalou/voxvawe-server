import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { DialogEntity } from "./entity/dialog.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "../user/entity/user.entity";
import { decodeToken } from "../util/decode-token";
import { JwtUserData } from "../types/jwt-user-data.interface";
import { DialogResponse } from "../types/dialog-response.interface";
import { CreateGroupDto } from "./dto/create-group.dto";
import { UserService } from "../user/user.service";
import { AddMemberDto } from "./dto/add-member.dto";



@Injectable()
export class DialogService {
  constructor(
    @InjectRepository(DialogEntity)
    private readonly dialogRepository: Repository<DialogEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly userService: UserService
  ) {
  }

  async createDialog(user: UserEntity, contact: UserEntity): Promise<DialogResponse> {

    const existDialog = await this.findExistingDialog(user, contact);

    if (existDialog) {
      return existDialog as DialogResponse;
    }

    const newDialog = new DialogEntity();
    newDialog.users = [user, contact];
    const createdDialog = await this.dialogRepository.save(newDialog);

    return {
      ...createdDialog,
      account_id: contact.account_id,
      username: contact.username,
      avatar: contact.avatar
    };
  }

  async addMemberToGroup(addMemberDto: AddMemberDto[]) {
    const chatId = Number(addMemberDto[0].chatId)

    const group = await this.dialogRepository.findOne({ where: { id: chatId }, relations: ['users'] });

    if (!group) {
      throw new Error('Неудалось добавить участникоа(ов). Группа не существует')
    }

    for (const member of addMemberDto) {
      const newMember = await this.userRepository.findOne({ where: { account_id: member.accountId } });
      if (!newMember) {
        throw new Error('Пользователь не может быть добавлен. Пользователь не найден');
      }
      if (group.users?.some(item => item.account_id === newMember.account_id)) {
        throw new Error(`Такой пользователь ${newMember.account_id} уже состоит в группе`);
      }

      group.users = [...group.users, newMember];
    }

    return await this.dialogRepository.save(group);

  };

  async createGroup({ creator, accountIds, groupName, files }: CreateGroupDto): Promise<DialogEntity> {
    if (!creator && accountIds.length <= 0) {
      throw new HttpException("Неврные данные", HttpStatus.BAD_REQUEST);
    }


    const admin = await this.userService.findUserById(creator);
    const members = await Promise.all(accountIds.map(async (member) => await this.userService.findUserById(member)));

    if (members.length !== accountIds.length) {
      throw new HttpException("Не все участники были найдены в базе данных", HttpStatus.BAD_REQUEST);
    }

    const newGroup = new DialogEntity();
    newGroup.users = [admin, ...members];
    newGroup.is_group = true;
    newGroup.admin = admin.account_id;
    newGroup.group_avatar = files;
    newGroup.group_name = groupName;

    return await this.dialogRepository.save(newGroup);
  }

  async getDialogs(token: string | undefined) {
    try {
      if (!token) {
        throw new Error("Token not provided");
      }

      const payload = decodeToken(token) as JwtUserData;
      const userId = payload.id;

      if (!userId) {
        throw new Error("Invalid token");
      }

      const userDialogs = await this.dialogRepository.createQueryBuilder("dialog")
        .leftJoinAndSelect("dialog.users", "user")
        .leftJoinAndSelect("dialog.users", "contact")
        .leftJoinAndSelect("dialog.messages", "message")
        .where("user.id = :userId", { userId })
        .orderBy("message.created_at", "DESC")
        .getMany();

      if (!userDialogs) {
        return [];
      };

      const dialogs = userDialogs.map((dialog) => {
        const otherUser = dialog.users.find((user) => user.id !== userId);
        const lastMessage = dialog.messages.length > 0 ? dialog.messages[0] : null

        return {
          id: dialog.id,
          username: dialog.is_group ? dialog.group_name : otherUser.username,
          avatar: dialog.is_group ? dialog.group_avatar : otherUser.avatar,
          lastMessage: lastMessage?.content,
          lastMessageTime: lastMessage?.sent_at,
          members: dialog.users,
          is_group: dialog.is_group ? dialog.is_group : false,
        };
      });

      return dialogs;

    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  };

  async findExistingDialog(user1: UserEntity, user2: UserEntity): Promise<DialogEntity | undefined> {
    const dialog = await this.dialogRepository.createQueryBuilder('dialog')
      .innerJoin('dialog.users', 'user1', 'user1.id = :user1Id', { user1Id: user1.id })
      .innerJoin('dialog.users', 'user2', 'user2.id = :user2Id', { user2Id: user2.id })
      .getOne();

    return dialog;
  }

  async findDialogById(dialogId: number) {
    try {
      return await this.dialogRepository.findOne({ where: { id: dialogId } });
    } catch (error) {
      console.error(error);
      throw new Error("Ошибка при поиске Dialog");
    }
  }
}
