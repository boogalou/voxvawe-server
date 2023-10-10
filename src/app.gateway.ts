import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { websocketGatewayConfig } from "./config/websocket-gateway.config";
import { Server } from "socket.io";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./user/entity/user.entity";
import { Repository } from "typeorm";
import { SocketExt } from "./types/socket-ext.interface";
import { RedisService } from "./redis/redis.service";
import { DialogGateway } from "./dialog/dialog.gateway";

@WebSocketGateway(websocketGatewayConfig)
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly redisService: RedisService,
    private readonly dialogGataway: DialogGateway,
  ) {
  }

  @WebSocketServer()
  server: Server;

  async handleConnection(socket: SocketExt, payload: string): Promise<void> {
    const redisClient = this.redisService.getClient();
    if (!socket || !socket.account_id) return;
    socket.join("server");
    console.log("socket client connected " + socket.account_id + " " + "online");
    const currentUser = await this.userRepository.findOne({ where: { account_id: socket.account_id } });
    if (currentUser && currentUser.is_online !== true) {
      await this.handleUpdateStatus(socket.account_id, true); // Установка статуса "online"
      await redisClient.sAdd("on_server", socket.account_id);
      this.server.to("server").emit("USER:STATUS_ONLINE", {
        payload: socket.account_id,
        type: "USER:STATUS_ONLINE"
      });
    }
  };

  async handleDisconnect(socket: SocketExt): Promise<void> {
    const redisClient = this.redisService.getClient();
    if (!socket || !socket.account_id) return;
    socket.leave("server");
    console.log("socket client disconnected " + socket.account_id + " " + "offline");
    const currentUser = await this.userRepository.findOne({ where: { account_id: socket.account_id } });
    if (currentUser && currentUser.is_online !== false) {
      await this.handleUpdateStatus(socket.account_id, false); // Установка статуса "offline"
      await redisClient.sRem("on_server", socket.account_id);
      this.server.to("server").emit("USER:STATUS_OFFLINE", {
        payload: socket.account_id,
        type: "USER:STATUS_OFFLINE"
      });
    }
  }

  async handleUpdateStatus(accountId: string, newStatus: boolean): Promise<void> {

    const user = await this.userRepository.findOne({ where: { account_id: accountId } });

    if (!user.account_id) {
      throw new Error("Ошибка при обновлени статуса. Пользователь не найден");
    }

    if (user.is_online !== newStatus) {
      user.is_online = newStatus;
      await this.userRepository.save(user);
    }

  }
}
