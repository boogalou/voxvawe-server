import { SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { websocketGatewayConfig } from "../config/websocket-gateway.config";
import { Server } from "socket.io";
import { SEARCH_REQUEST, SEARCH_RESPONSE } from "../constants/soket-events";
import { ContactService } from "./contact.service";
import { SocketExt } from "../types/socket-ext.interface";
import { Injectable } from "@nestjs/common";

@Injectable()
@WebSocketGateway(websocketGatewayConfig)
export class ContactGateway {

  constructor(
    private readonly contactService: ContactService,
  ) {
  }

  @WebSocketServer()
  server: Server;

  @SubscribeMessage(SEARCH_REQUEST)
  async handleSearch(socket: SocketExt, payload: {query: string}): Promise<void> {
    try {
      const searchResponse = await this.contactService.search(payload.query);
      socket.emit(SEARCH_RESPONSE, searchResponse);
    } catch (error) {
      socket.emit("ERROR_RESPONSE", error.message);
    }
  }
}