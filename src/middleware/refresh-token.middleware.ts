import { HttpException, HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { JwtUserData } from "../types/jwt-user-data.interface";
import { TokenService } from "../token/token.service";

@Injectable()
export class RefreshTokenExceptionMiddleware implements NestMiddleware {

  constructor(
    private readonly tokenService: TokenService
  ) {
  }

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies["refreshToken"];

    if (!token) {
      throw new HttpException("Отказано в доступе. RefreshToken не найден", HttpStatus.FORBIDDEN);
    }

    try {
      const tokenDecoded = this.tokenService.validateToken(token, "refresh") as JwtUserData;
      next();

    } catch (error) {
      res.clearCookie("refreshToken");
      throw new HttpException("Срок действия токена истек", HttpStatus.FORBIDDEN);
    }
  }
}