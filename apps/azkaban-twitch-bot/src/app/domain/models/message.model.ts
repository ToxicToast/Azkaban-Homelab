import { Anemic } from '@azkaban/shared';

export interface MessageModel extends Anemic {
  readonly channel_id: string;
  readonly user_id: string;
  readonly message_id: string;
  readonly channel: string;
  readonly username: string;
  readonly message: string;
  readonly message_color: string;
}

export interface CreateMessage {
  readonly id: string;
  readonly channel_id: string;
  readonly user_id: string;
  readonly message_id: string;
  readonly channel: string;
  readonly username: string;
  readonly message: string;
  readonly message_color: string;
}
