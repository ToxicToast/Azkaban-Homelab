import { IEvent } from '@nestjs/cqrs';
import { ChatSubGiftUpgradeInfo, UserNotice } from '@twurple/chat';

export class GiftPaidUpgradeEvent implements IEvent {
  constructor(
    public readonly channel: string,
    public readonly username: string,
    public readonly subInfo: ChatSubGiftUpgradeInfo,
    public readonly msg: UserNotice
  ) {}
}
