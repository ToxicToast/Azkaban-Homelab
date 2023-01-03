import { IEvent } from '@nestjs/cqrs';
import { ChatSubGiftInfo, UserNotice } from '@twurple/chat';

export class SubGiftEvent implements IEvent {
  constructor(
    public readonly channel: string,
    public readonly username: string,
    public readonly subInfo: ChatSubGiftInfo,
    public readonly msg: UserNotice
  ) {}
}
