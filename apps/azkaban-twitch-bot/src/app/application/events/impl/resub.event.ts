import { IEvent } from '@nestjs/cqrs';
import { ChatSubInfo, UserNotice } from '@twurple/chat';

export class ResubEvent implements IEvent {
  constructor(
    public readonly channel: string,
    public readonly username: string,
    public readonly subInfo: ChatSubInfo,
    public readonly msg: UserNotice
  ) {}
}
