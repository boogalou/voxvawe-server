export class CreateDialogDto {
  readonly name: string;
  readonly last_message_time?: Date;
  readonly lastMessageText?: string;
  readonly lastMessageStatus?: string;
  readonly interlocutorId: string;
  readonly interlocutorName: string;
  readonly interlocutorAvatar?: string;
  readonly unreadMessages?: number;
  readonly isActive?: boolean;
}