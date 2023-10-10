import { VoiceMessage } from "../../types/voice-message";


export class InMessageDto {
  readonly id: number;
  readonly chat_id: number;
  readonly sender_id: string;
  readonly recipient_id: string;
  readonly content: string;
  readonly sent_at: Date;
  readonly edit_at: Date | null;
  readonly is_read: boolean;
  readonly is_delivered: boolean;
  readonly attachments: string[] | null;
  readonly voice_message: VoiceMessage | null;
}