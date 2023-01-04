import { IEvent } from '@nestjs/cqrs';
import { TwitchPrivateMessage } from '@twurple/chat/lib/commands/TwitchPrivateMessage';

export class MessageEvent implements IEvent {
  constructor(
    public readonly channel: string,
    public readonly username: string,
    public readonly message: string,
    public readonly msg: TwitchPrivateMessage
  ) {}
}
