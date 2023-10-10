import { JwtPayload } from "jsonwebtoken";

export interface JwtUserData extends JwtPayload {
  id: number;
  account_id: string;
  email: string;
  username: string;
}