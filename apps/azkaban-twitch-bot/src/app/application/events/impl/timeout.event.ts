import { IEvent } from '@nestjs/cqrs';
import { ClearChat } from '@twurple/chat';

export class TimeoutEvent implements IEvent {
  constructor(
    public readonly channel: string,
    public readonly username: string,
    public readonly duration: number,
    public readonly msg: ClearChat
  ) {}
}
