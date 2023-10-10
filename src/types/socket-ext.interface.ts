import { Socket } from "socket.io";

export interface SocketExt extends Socket {
  account_id: string | null;
}