import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { DialogEntity } from "../../dialog/entity/dialog.entity";
import { UserEntity } from "../../user/entity/user.entity";
import { VoiceMessage } from "../../types/voice-message";


@Entity({ name: "messages" })
export class MessageEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: "" })
  content: string;

  @Column({ default: "" })
  recipient_id: string;

  @Column({ default: false })
  is_delivered: boolean;

  @Column({ default: false })
  is_deleted: boolean;

  @Column({ default: false })
  is_read: boolean;

  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Column({ default: null, nullable: true })
  sent_at: Date;

  @Column()
  @UpdateDateColumn({ default: null, nullable: true })
  edit_at: Date | null;

  @Column({ default: null, type: "jsonb", nullable: true })
  attachments: string[] | null;

  @Column({default: null, type: 'jsonb', nullable: true })
  voice_message: VoiceMessage | null;

  @ManyToOne(() => DialogEntity, (dialog) => dialog.messages)
  dialog: DialogEntity;

  @ManyToOne(() => UserEntity, (user) => user.messages)
  @JoinColumn({ name: "sender_id", referencedColumnName: "account_id" })
  sender: UserEntity;
}