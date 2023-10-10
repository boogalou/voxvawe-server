import { Injectable } from "@nestjs/common";
import { sign, verify } from "jsonwebtoken";
import { ConfigService } from "@nestjs/config";
import { Repository } from "typeorm";
import { TokenEntity } from "./entity/token.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class TokenService {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(TokenEntity)
    private readonly tokenRepository: Repository<TokenEntity>
  ) {
  }

  accessTokenGenerator({ id, account_id, email, username }: { id: number, account_id: string, email: string, username: string }): string {
    const accessToken = sign(
      {
        id,
        account_id,
        email,
        username
      },
      this.configService.get("JWT_ACCESS_SECRET"),
      {
        expiresIn: "30m"
      }
    );
    return accessToken;
  }

  refreshTokenGenerator({ id, account_id, email, username}: { id: number, account_id: string, email: string, username: string, }) {
    const refreshToken = sign(
      {
        id,
        account_id: account_id,
        email,
        username
      },
      this.configService.get("JWT_REFRESH_SECRET"),
      {
        expiresIn: "24h"
      }
    );
    return refreshToken;
  }

  generateLinkToken(accountId: string): string {
    const linkToken = sign(
      { accountId: accountId },
      this.configService.get("JWT_LINK_SECRET"),
      {
        expiresIn: "24h"
      }
    );

    return linkToken;
  }

  async saveToken(userId: number, refreshToken: string) {
    let tokenData = await this.tokenRepository.findOne({
      where: { user_id: userId }
    });

    if (tokenData && tokenData.refresh_token) {
      tokenData.refresh_token = refreshToken;
      return await this.tokenRepository.save(tokenData);
    }

    const newToken = this.tokenRepository.create({
      user_id: userId,
      refresh_token: refreshToken,
    });

    return await this.tokenRepository.save(newToken);
  }

  async removeToken(refreshToken: string) {
    const tokenData = await this.tokenRepository.delete({
      refresh_token: refreshToken
    });
    return tokenData;
  }

  async findToken(token: string) {
    const tokenData = await this.tokenRepository.findOne({
      where: { refresh_token: token }
    });
    return tokenData;
  }

  validateToken(token: string, typeToken: string) {
    const jwtConfig =
      typeToken === "access" ? "JWT_ACCESS_SECRET" : "JWT_REFRESH_SECRET";
    const userData = verify(token, this.configService.get(jwtConfig));
    return userData;
  }
}
