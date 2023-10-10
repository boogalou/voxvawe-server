import { decode, JwtPayload } from "jsonwebtoken";
import { HttpException, HttpStatus } from "@nestjs/common";

export function decodeToken(token: string): JwtPayload {
  token = token.split(" ")[1];
  if (token) {
    return decode(token) as JwtPayload;
  } else {
    throw new HttpException("Token not found", HttpStatus.NOT_FOUND);
  }
}