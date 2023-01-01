import { IEvent } from '@nestjs/cqrs';

export class FollowerEvent implements IEvent {
  constructor(
    public readonly channelId: string,
    public readonly followerId: string,
    public readonly date: Date
  ) {}
}
