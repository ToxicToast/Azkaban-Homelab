import { IEvent } from '@nestjs/cqrs';
import { ChatCommunitySubInfo, UserNotice } from '@twurple/chat';

export class CommunitySubEvent implements IEvent {
  constructor(
    public readonly channel: string,
    public readonly username: string,
    public readonly subInfo: ChatCommunitySubInfo,
    public readonly msg: UserNotice
  ) {}
}
