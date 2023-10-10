import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MessageEntity } from "./entity/message.entity";
import { Repository } from "typeorm";
import { OutMessageDto } from "./dto/out-message.dto";
import { InMessageDto } from "./dto/in-message.dto";
import { UserEntity } from "../user/entity/user.entity";
import { DialogEntity } from "../dialog/entity/dialog.entity";
import { verify } from "jsonwebtoken";
import { ConfigService } from "@nestjs/config";
import { JwtUserData } from "../types/jwt-user-data.interface";



@Injectable()
export class MessageService {

  constructor(
    @InjectRepository(MessageEntity)
    private readonly messageRepository: Repository<MessageEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(DialogEntity)
    private readonly dialogRepository: Repository<DialogEntity>,
    private readonly configService: ConfigService
  ) {
  }

  async addMessage(outMessageDto: OutMessageDto): Promise<InMessageDto> {
    try {
      const newMessage = new MessageEntity();
      Object.assign(newMessage, outMessageDto);

      const dialog = await this.dialogRepository.findOne({ where: { id: outMessageDto.chat_id } });
      const user = await this.userRepository.findOne({ where: { account_id: outMessageDto.sender_id } });

      if (user && dialog) {
        newMessage.sender = user;
        newMessage.dialog = dialog;
      }

      const savedMessage = await this.messageRepository.save(newMessage);
      const message = Object.assign(new InMessageDto(), savedMessage);
      delete message.sender
      delete message.dialog

      return {
        ...message,
        sender_id: outMessageDto.sender_id,
      };

    } catch (error) {
      console.error(error);
      throw new Error("Ошибка добавления сообщения в БД");
    }
  };

  async getLatestMessages(chatId: number, page: number = 1, limit: number = 25,  token: string): Promise<{ chat_id: number, messages: InMessageDto[], hasMore: boolean }> {
    try {
      const jwtUserData = verify(token.split(" ")[1], this.configService.get("JWT_ACCESS_SECRET")) as JwtUserData;

      if (!jwtUserData.id) {
        throw new Error("Неудалось получить токен доступа - token invalid");
      }

      const dialog = await this.dialogRepository.findOne({
        where: { id: chatId },
        relations: ["users"]
      });

      if (!dialog) {
        throw new Error("Чат с указанным chatId не найден")
      }

      const membersIds = dialog.users.map((participant) => participant.account_id);

      if (!membersIds.includes(String(jwtUserData.account_id))) {
        throw new Error("Запрашивающая сторона не является участником данного чата");
      }


      const offset = (Number(page) - 1) * Number(limit);

      const messagesCount = await this.messageRepository.count({
        where: { dialog: { id: chatId } },
      });

      const hasMore = messagesCount > offset + Number(limit);

      const messagesByChatId = await this.messageRepository.find({
        where: { dialog: { id: chatId } },
        order: { created_at: "DESC" },
        skip: offset,
        take: limit,
        relations: ["sender"]
      });



      const latestMessages: InMessageDto[] = messagesByChatId.map((message) => {
        return {
          id: message.id,
          chat_id: chatId,
          sender_id: message.sender.account_id,
          recipient_id: message.recipient_id,
          content: message.content,
          sent_at: message.sent_at,
          edit_at: message.edit_at,
          is_read: message.is_read,
          is_delivered: message.is_delivered,
          attachments: message.attachments || [],
          voice_message: message.voice_message,
        };
      });


      const sortedMessage = latestMessages.reverse();

      return {
        chat_id: chatId,
        messages: sortedMessage,
        hasMore: hasMore,
      };
    } catch (error) {
      console.error(error);
      throw new Error("Ошибка получения последних сообщений");
    }
  };


  async setMessageIsRead (messageId: number, chatId: number) {
    try {
      if (!messageId || !chatId) {
        throw new Error('Неудалось совершить запрос. Отсутсвуют небходимые значения. Повторите запрос');
      }

      const message = await this.getOneMessage(messageId, chatId);
      if (!message.is_read) {
        // Обновление сообщения и сохранение его
        message.is_read = true;
         const messageIsRead = await this.messageRepository.save(message);
         return messageIsRead;
      } else {
        console.log('Сообщение уже помечено как прочитанное.');
        // Обработка этого случая по необходимости, например, возврат успешного ответа.
      }
    } catch (err) {
      console.log(err);
    }
  }

  async getOneMessage(messageId: number, chatId: number) {
    try {
      if (!messageId || !chatId) {
        throw new Error('Неудалось совершить запрос. Отсутсвуют небходимые значения. Повторите запрос');
      }

     return await this.messageRepository.findOne({ where: {id: messageId } })

    } catch (err) {
      console.log(err);
    }
  };

}
