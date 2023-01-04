import { IEvent } from '@nestjs/cqrs';

export class OnlineEvent implements IEvent {
  constructor(
    public readonly id: string,
    public readonly channelId: string,
    public readonly type: string,
    public readonly date: Date,
    public readonly title: string,
    public readonly thumbnail: string
  ) {}
}
