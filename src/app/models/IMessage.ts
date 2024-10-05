export interface IMessage {
  id: string;
  messageText?: string;
  image?: string;
  timestamp: Date;
  user: string;
}
