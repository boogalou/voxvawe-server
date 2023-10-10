import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { UserEntity } from "../user/entity/user.entity";
import { decodeToken } from "../util/decode-token";
import { DialogService } from "../dialog/dialog.service";
import { JwtUserData } from "../types/jwt-user-data.interface";


@Injectable()
export class ContactService {

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @Inject(DialogService)
    private readonly dialogService: DialogService,
    private dataSource: DataSource
  ) {
  }

  async addContact(accountId: string, token: string) {
      if (!accountId || !token) {
        throw new HttpException({
          status: HttpStatus.BAD_REQUEST,
          message: "Неудалось добавить контакт. Отсутствуют обязательные параметры: accountId и/или token",
          time: new Date().toISOString(),
        }, HttpStatus.BAD_REQUEST);
      }
      const jwtPayload = decodeToken(token) as JwtUserData;

      const user = await this.userRepository.findOneOrFail({
        where: { id: jwtPayload.id },
        relations: ["contacts"]
      });

      const contact = await this.userRepository.findOneOrFail({
        where: { account_id: accountId },
        relations: ["addedContacts"]
      });

      const isContactAdded = user.contacts.some(c => c.id === contact.id);

      if (isContactAdded) {
        throw new HttpException({
          status: HttpStatus.CONFLICT,
          message: "Контакт уже добавлен",
          time: new Date().toISOString(),
        }, HttpStatus.CONFLICT);
      }

      const savedUser = await this.dataSource.transaction(async (manager) => {

        user.contacts.push(contact);
        contact.addedContacts.push(user);

        await manager.save(user);
        await manager.save(contact);

        return await manager.findOne(UserEntity, { where: { id: user.id }, relations: ["contacts"] });
      });

      await this.dialogService.createDialog(user, contact);
      return savedUser.contacts;
  };

  async deleteContact(accountId: string, token: string) {
    if (!accountId || !token) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        message: "Неудалось добавить контакт. Отсутствуют обязательные параметры: accountId и/или token",
        time: new Date().toISOString(),
      }, HttpStatus.BAD_REQUEST);
    }

    const jwtPayload = decodeToken(token) as JwtUserData;
    const user = await this.userRepository.findOne({ where: { id: jwtPayload.id }, relations: ["contacts"] });

    if (user) {
      user.contacts = user.contacts.filter((contact) => contact.account_id !== accountId);
      const result = await this.userRepository.save(user);
      return result.contacts;
    }
  };

  async search(searchTerm: string) {
    const userProfiles = await this.userRepository.createQueryBuilder("user")
      .where("user.username LIKE :searchTerm OR user.email LIKE :searchTerm OR user.account_id LIKE :searchTerm", { searchTerm: `%${searchTerm}%` })
      .limit(10)
      .select([
        "user.id",
        "user.account_id",
        "user.username",
        "user.last_seen",
        "user.is_online",
        "user.avatar"
      ])
      .getMany();
    return userProfiles.filter(Boolean);
  };

  async getContacts(token: string): Promise<UserEntity[]> {
    const jwtPayload = decodeToken(token);
    const user = await this.userRepository.findOne({ where: { id: jwtPayload["id"] }, relations: ["contacts"] });
    return user.contacts;
  }
}
