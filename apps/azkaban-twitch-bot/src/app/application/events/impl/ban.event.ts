import { IEvent } from '@nestjs/cqrs';
import { ClearChat } from '@twurple/chat';

export class BanEvent implements IEvent {
  constructor(
    public readonly channel: string,
    public readonly username: string,
    public readonly msg: ClearChat
  ) {}
}
