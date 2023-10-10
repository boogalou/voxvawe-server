import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { hash } from "bcrypt";
import { DialogEntity } from "../../dialog/entity/dialog.entity";
import { UserProfileEntity } from "../../user-profile/entity/user-profile.entity";
import { MessageEntity } from "../../message/entity/message.entity";

@Entity({ name: "users" })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  account_id: string;

  @Column({ nullable: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: true })
  last_seen: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  update_at: Date;

  @Column({ default: false })
  is_online: boolean;

  @Column({ default: false })
  is_activated: boolean;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 12);
  }

  @OneToOne(() => UserProfileEntity)
  @JoinColumn({ name: "profile_id" })
  userProfile: UserProfileEntity;

  @ManyToMany(() => UserEntity)
  @JoinTable({
    name: "contact_list",
    joinColumn: { name: "user_id", referencedColumnName: "id" },
    inverseJoinColumn: { name: "contact_id", referencedColumnName: "id" }
  })
  contacts: UserEntity[];

  @ManyToMany(() => UserEntity)
  @JoinTable({
    name: "added_contacts",
    joinColumn: {name: "user_id", referencedColumnName: "id"},
    inverseJoinColumn: {name: "added_contact_id", referencedColumnName: "id"}
  })
  addedContacts: UserEntity[];

  @ManyToMany(() => DialogEntity)
  @JoinTable({
    name: "user_dialogs",
    joinColumns: [{ name: "user_id", referencedColumnName: "id" }],
    inverseJoinColumns: [{ name: "dialog_id", referencedColumnName: "id" }]
  })
  dialogs: DialogEntity[];



  @OneToMany(() => MessageEntity, (message) => message.sender)
  messages: MessageEntity[];
}
