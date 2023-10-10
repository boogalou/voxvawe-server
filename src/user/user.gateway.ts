// import {
//   OnGatewayConnection,
//   OnGatewayDisconnect,
//   WebSocketGateway,
//   WebSocketServer
// } from "@nestjs/websockets";
// import { Server } from "socket.io";
// import { InjectRepository } from "@nestjs/typeorm";
// import { Repository } from "typeorm";
// import { UserEntity } from "./entity/user.entity";
// import { Injectable } from "@nestjs/common";
// import { SocketExt } from "../types/socket-ext.interface";
// import { websocketGatewayConfig } from "../config/websocket-gateway.config";
//
//
// @Injectable()
// @WebSocketGateway(websocketGatewayConfig)
// export class UserGateway implements OnGatewayConnection, OnGatewayDisconnect {
//
// }