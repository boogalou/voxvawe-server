import { Injectable, NestMiddleware } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { NextFunction } from "express";
import { ExpressRequestInterface } from "../types/express-request.Interface";
import { TokenService } from "../token/token.service";
import { JwtUserData } from "../types/jwt-user-data.interface";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly tokenService: TokenService,
    private readonly userService: UserService
  ) {
  }

  async use(req: ExpressRequestInterface, res: Response, next: NextFunction) {
    const authorizationHeader = req.headers.authorization
    if (!authorizationHeader) {
      req.user = null;
      return next();
    }

    const token = req.headers.authorization.split(" ")[1];

    try {
      const decodeToken = this.tokenService.validateToken(token, "access") as JwtUserData;
      const user = await this.userService.findUserById(decodeToken.id)
      req.user = user;
      next();
    } catch (err) {
      req.user = null
      next();
    }
  }
}

