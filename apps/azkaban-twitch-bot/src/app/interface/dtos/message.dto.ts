import { TwitchPrivateMessage } from '@twurple/chat/lib/commands/TwitchPrivateMessage';

export interface MessageDto {
  channel: string;
  username: string;
  message: string;
  msg: TwitchPrivateMessage;
}
