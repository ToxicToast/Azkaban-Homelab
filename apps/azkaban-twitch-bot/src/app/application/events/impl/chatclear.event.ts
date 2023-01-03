import { IEvent } from '@nestjs/cqrs';
import { ClearChat } from '@twurple/chat';

export class ChatClearEvent implements IEvent {
  constructor(
    public readonly channel: string,
    public readonly msg: ClearChat
  ) {}
}
