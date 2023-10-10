import { SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Injectable } from "@nestjs/common";
import { Server } from "socket.io";
import { SocketExt } from "../types/socket-ext.interface";
import { OutMessageDto } from "./dto/out-message.dto";
import { MessageService } from "./message.service";
import { RedisService } from "../redis/redis.service";
import { response } from "express";


@Injectable()
@WebSocketGateway()
export class MessageGateway {

  constructor(
    private readonly messageService: MessageService,
    private readonly redisService: RedisService
  ) {
  }

  @WebSocketServer()
  server: Server;

  @SubscribeMessage("CHAT:SEND_MESSAGE")
  async handleMessage(socket: SocketExt, outMessageDto: OutMessageDto): Promise<void> {
    try {
      const redisClient = this.redisService.getClient();
      if (!outMessageDto.sender_id) {
        throw new Error("Нет сообщения");
      }

      const newMessage = await this.messageService.addMessage(outMessageDto);

      const recipientIds: string[] = JSON.parse(outMessageDto.recipient_id);
      for (const recipientId of recipientIds) {
        const recipientInServer = await redisClient.sMembers("on_server")
          .then((result) => result.some(recipient => recipient === recipientId));
        const recipientInChat = await redisClient.sMembers(`chatID:${outMessageDto.chat_id}`)
          .then((result) => result.some(recipient => recipient === recipientId));

        await this.processMessageInChat(newMessage, recipientId, recipientInChat, recipientInServer);
      }

      if (socket && newMessage.sender_id) {
        this.server.to(`chat#_${outMessageDto.chat_id}`).emit("CHAT:NEW_MESSAGE", {
          payload: {
            ...newMessage
          },
          type: "CHAT:NEW_MESSAGE"
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  @SubscribeMessage("CHAT:SET_MESSAGE_STATUS")
  async handleUpdateStatusMessage(socket: SocketExt, payload: { messageId: number, chatId: number }) {
    try {
      await this.messageService.setMessageIsRead(payload.messageId, payload.chatId);
      socket.broadcast.to(`chat#_${payload["chatId"]}`).emit("CHAT:GET_MESSAGE_STATUS", {
        payload: {
          ...payload
        },
        type: "CHAT:GET_MESSAGE_STATUS"
      });
    } catch (err) {
      console.log(err);
    }
  }

  async processMessageInChat(outMessageDto: OutMessageDto, recipientId: string, recipientInChat: boolean, recipientInServer: boolean) {
    const redisClient = this.redisService.getClient();

    if (recipientInServer && !recipientInChat) {
      await redisClient.rPush(
        `chatID:${outMessageDto.chat_id}:accountID:${recipientId}`, JSON.stringify(outMessageDto));
    }

    if (!recipientInServer && !recipientInChat) {
      await redisClient.del(`chatID:${outMessageDto.chat_id}:accountID:${recipientId}`);
    }
  }
}