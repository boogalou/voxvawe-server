import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany, OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { UserEntity } from "../../user/entity/user.entity";
import { MessageEntity } from "../../message/entity/message.entity"

@Entity({ name: 'dialogs' })
export class DialogEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({default: ''})
  admin: string;

  @Column({default: ''})
  group_avatar: string;

  @Column({default: ''})
  group_name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ default: false})
  is_group: boolean;

  @ManyToMany(() => UserEntity)
  @JoinTable({
    name: 'user_dialogs',
    joinColumns: [{ name: 'dialog_id', referencedColumnName: 'id' }],
    inverseJoinColumns: [{ name: 'user_id', referencedColumnName: 'id' }],
  })
  users: UserEntity[];

  @OneToMany(() => MessageEntity, (message) => message.dialog)
  messages: MessageEntity[];
}