import { Socket } from "socket.io";

export interface SocketMiddleware {
  use(socket: Socket, next: () => void): any;
}