import { Controller, Logger } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { OnEvent } from '@nestjs/event-emitter';
import { JoinEventDto, PartEventDto } from '../dtos/viewerStatus.dto';
import { MessageDto } from '../dtos/message.dto';
import {
  MessageEvent,
  PartEvent,
  JoinEvent,
  ActionEvent,
} from '../../application/events/impl';

@Controller('bot')
export class BotController {
  constructor(private readonly eventBus: EventBus) {}

  @OnEvent('chatJoinEvent')
  onJoin(payload: JoinEventDto): void {
    this.eventBus.publish(new JoinEvent(payload.channel, payload.username));
  }

  @OnEvent('chatPartEvent')
  onPart(payload: PartEventDto): void {
    this.eventBus.publish(new PartEvent(payload.channel, payload.username));
  }

  @OnEvent('chatMessageEvent')
  onMessage(payload: MessageDto): void {
    this.eventBus.publish(
      new MessageEvent(
        payload.channel,
        payload.username,
        payload.message,
        payload.msg
      )
    );
  }

  @OnEvent('chatActionEvent')
  onAction(payload: MessageDto): void {
    this.eventBus.publish(
      new ActionEvent(
        payload.channel,
        payload.username,
        payload.message,
        payload.msg
      )
    );
  }

  @OnEvent('chatBanEvent')
  onBan(payload): void {
    Logger.debug({ ...payload }, 'onBan');
  }

  @OnEvent('chatClearEvent')
  onClear(payload): void {
    Logger.debug({ ...payload }, 'onClear');
  }

  @OnEvent('chatDisconnectEvent')
  onDisconnect(payload): void {
    Logger.debug({ ...payload }, 'onDisconnect');
  }

  @OnEvent('chatConnectEvent')
  onConnect(payload): void {
    Logger.debug({ ...payload }, 'onConnect');
  }

  @OnEvent('chatGiftPaidUpgradeEvent')
  onGiftPaidUpgrade(payload): void {
    Logger.debug({ ...payload }, 'onGiftPaidUpgrade');
  }

  @OnEvent('chatRaidEvent')
  onRaid(payload): void {
    Logger.debug({ ...payload }, 'onRaid');
  }

  @OnEvent('chatResubEvent')
  onResub(payload): void {
    Logger.debug({ ...payload }, 'onResub');
  }

  @OnEvent('chatSubGiftEvent')
  onSubGift(payload): void {
    Logger.debug({ ...payload }, 'onSubGift');
  }

  @OnEvent('chatCommunitySubEvent')
  onCommunitySub(payload): void {
    Logger.debug({ ...payload }, 'onCommunitySub');
  }

  @OnEvent('chatSubEvent')
  onSub(payload): void {
    Logger.debug({ ...payload }, 'onSub');
  }

  @OnEvent('chatTimeoutEvent')
  onTimeout(payload): void {
    Logger.debug({ ...payload }, 'onTimeout');
  }
}
