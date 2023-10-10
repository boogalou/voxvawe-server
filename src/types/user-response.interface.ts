import { UserEntity } from '../user/entity/user.entity';

export type UserType = Omit<UserEntity, 'hashPassword' | 'generateAccountId' | 'tokens'>;

export interface UserResponse {
  user: UserType & { access_token: string, refresh_token: string };
}
