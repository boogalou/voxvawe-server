import { IsEmail } from "class-validator";

export class UserProfileDto {
  readonly id: number;
  readonly accoun_id: string;
  readonly username: string;

  @IsEmail()
  readonly email: string;
  readonly gender: string;
  readonly age: number;
  readonly bio: string;
}