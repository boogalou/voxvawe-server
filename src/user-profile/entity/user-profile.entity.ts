import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "../../user/entity/user.entity";



@Entity({ name: 'user_profiles' })
export class UserProfileEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  username: string;

  @Column({ default: '' })
  email: string;

  @Column({ default: '' })
  gender: string;

  @Column({ nullable: true })
  age: number;

  @Column({ default: '' })
  bio: string;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;

  @OneToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' }) // указываем имя поля для хранения внешнего ключа
  user: UserEntity;
}
