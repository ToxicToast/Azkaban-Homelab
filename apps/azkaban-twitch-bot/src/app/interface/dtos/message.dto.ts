import { TwitchPrivateMessage } from '@twurple/chat/lib/commands/TwitchPrivateMessage';

export interface MessageEventDto {
  channel: string;
  username: string;
  message: string;
  msg: TwitchPrivateMessage;
}

export interface ActionEventDto {
  channel: string;
  username: string;
  message: string;
  msg: TwitchPrivateMessage;
}
