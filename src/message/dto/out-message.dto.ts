import { VoiceMessage } from "../../types/voice-message";

export class OutMessageDto {
  readonly chat_id: number;
  readonly sender_id: string;
  readonly recipient_id: string;
  readonly content: string;
  readonly sent_at: Date;
  readonly attachments: string[] | null;
  readonly voice_message: VoiceMessage | null;
}