import { IEvent } from '@nestjs/cqrs';
import { ChatRaidInfo, UserNotice } from '@twurple/chat';

export class RaidEvent implements IEvent {
  constructor(
    public readonly channel: string,
    public readonly username: string,
    public readonly raidInfo: ChatRaidInfo,
    public readonly msg: UserNotice
  ) {}
}
