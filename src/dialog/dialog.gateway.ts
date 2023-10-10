import { Injectable } from "@nestjs/common";
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from "@nestjs/websockets";
import { Server } from "socket.io";
import { SocketExt } from "../types/socket-ext.interface";
import { RedisService } from "../redis/redis.service";
import { OutMessageDto } from "../message/dto/out-message.dto";
import * as console from "console";


export interface JoinData {
  chatId: number;
  accountId: string;
}


@Injectable()
@WebSocketGateway()
export class DialogGateway implements OnGatewayDisconnect {
  private currentChatId: number | null = null;


  constructor(
    private readonly redisService: RedisService
  ) {
  }

  @WebSocketServer()
  server: Server;

  async handleDisconnect(socket: SocketExt) {
    if (socket.account_id && this.currentChatId) {
      await this.handleLeftChatRoom(socket, {
        chatId: this.currentChatId,
        accountId: socket.account_id
      });
    }
  }

  @SubscribeMessage("CHAT:JOIN_PRIVATE_ROOM")
  async handleJoinChatRoom(socket: SocketExt, payload: JoinData) {
    console.log("handleChatRoom join: ", payload);
    try {

      const redisClient = this.redisService.getClient();
      const unreadMessages = await redisClient.lRange(`chatID:${payload.chatId}:accountID:${payload.accountId}`, 0, -1);

      if (this.currentChatId !== null && payload.chatId !== this.currentChatId) {
        await this.handleLeftChatRoom(socket, { chatId: this.currentChatId, accountId: payload.accountId });
      }

      if (payload.chatId) {
        await redisClient.sAdd(`chatID:${payload.chatId}`, payload.accountId);
        socket.join(`chat#_${payload.chatId}`);
        this.server.to(`chat#_${payload.chatId}`)
          .emit("CHAT:JOINED_PRIVATE_ROOM", {
            payload: `user: ${payload.accountId} joined to room ${payload.chatId}`,
            type: "CHAT:JOINED_PRIVATE_ROOM"
          });

        if (unreadMessages && unreadMessages.length > 0) {
          const messages: OutMessageDto[] = unreadMessages.map(message => JSON.parse(message));
          messages.forEach(message => {
            socket.emit("CHAT:NEW_MESSAGE", {
              payload: {
                ...message
              },
              type: "CHAT:NEW_MESSAGE"
            });
          });

          await redisClient.del(`chatID:${payload.chatId}:accountID:${payload.accountId}`);
        }
      }

      this.currentChatId = payload.chatId;

    } catch (error) {
      console.log(error);
    }
  };

  @SubscribeMessage("CHAT:LEAVE_PRIVATE_ROOM")
  async handleLeftChatRoom(socket: SocketExt, payload?: JoinData) {
    console.log("handleLeftChatRoom leave: ", payload);
    if (payload) {
      const redisClient = this.redisService.getClient();
      await redisClient.sRem(`chatID:${payload.chatId}`, payload.accountId);
      console.log(payload.accountId + " покинул комнату " + this.currentChatId);
      socket.leave(`chat#_${this.currentChatId}`);
      this.server.to(`chat#_${this.currentChatId}`)
        .emit("CHAT:LEFT_PRIVATE_ROOM", {
          payload: `user: ${socket.account_id} left room ${this.currentChatId}`,
          type: "CHAT:LEFT_PRIVATE_ROOM"
        });
    }
  };

  @SubscribeMessage("CHAT:TYPING_TEXT")
  async handleTypingNotify(socket: SocketExt, payload: number) {
    socket.broadcast.to(`chat#_${payload["chatId"]}`).emit("CHAT:TYPING_NOTIFY", {
      payload: {
        account_id: socket.account_id,
        message: "is typing...",
        time: new Date().toISOString()
      },
      type: "CHAT:TYPING_NOTIFY"
    });
  }


}


