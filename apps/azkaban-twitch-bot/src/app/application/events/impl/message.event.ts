import { IEvent } from '@nestjs/cqrs';

export class MessageEvent implements IEvent {
  constructor(
    public readonly channel: string,
    public readonly username: string,
    public readonly message: string,
    public readonly messageId: string,
    public readonly messageColor: string,
    public readonly userId: string,
    public readonly channelId: string
  ) {}
}
