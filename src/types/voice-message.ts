export interface VoiceMessage {
  duration: number;
  id: number;
  link_mp3: string;
  link_ogg: string;
  owner_id: number;
  access_key: string;
  waveform: number[];
}