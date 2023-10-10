import { INestApplication, Injectable } from "@nestjs/common";
import { ServerOptions } from "socket.io";
import { IoAdapter } from "@nestjs/platform-socket.io";
import { ConfigService } from "@nestjs/config";
import { JwtUserData } from "../types/jwt-user-data.interface";
import { SocketExt } from "../types/socket-ext.interface";
import { verify } from "jsonwebtoken";


@Injectable()
export class AuthSocketAdapter extends IoAdapter {

  constructor(
    private app: INestApplication,
    private configService: ConfigService
  ) {
    super(app);
  }

  createIOServer(port: number, options?: ServerOptions): any {
    const server = super.createIOServer(port, options)

    const cors = {
      origin: ["http://localhost:5173"],
      methods: ["GET", "POST"],
      allowedHeaders: ["Authorization", "Content-Type"],
      credentials: true,
      withCredentials: true
    };

    const optionsWithCORS: ServerOptions = {
      ...options,
      cors
    };

    server.use((socket: SocketExt, next: () => void) => {

      const authorization = socket.handshake.auth.authorization;

      if (!authorization) {
        socket.account_id = null;
        next();
      }

      const [bearer, token] = socket.handshake.auth.authorization.split(" ");
      try {
        const decodeToken = verify(token, this.configService.get('JWT_ACCESS_SECRET')) as JwtUserData;
        socket.account_id = decodeToken.account_id;
        next();

      } catch (error) {
        socket.account_id = null;
        next();
      }
    });

    return server;
  }
}