import { Controller, Logger } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { OnEvent } from '@nestjs/event-emitter';
import {
  BanEventDto,
  JoinEventDto,
  PartEventDto,
  ResubEventDto,
  SubEventDto,
  SubGiftEventDto,
  TimeoutEventDto,
} from '../dtos/viewerStatus.dto';
import { ActionEventDto, MessageEventDto } from '../dtos/message.dto';
import {
  MessageEvent,
  PartEvent,
  JoinEvent,
  ActionEvent,
} from '../../application/events/impl';
import {
  ChatClearEventDto,
  CommunitySubEventDto,
  DisconnectEventDto,
  GiftPaidUpgradeEventDto,
  RaidEventDto,
} from '../dtos/chat.dto';

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
  onMessage(payload: MessageEventDto): void {
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
  onAction(payload: ActionEventDto): void {
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
  onBan(payload: BanEventDto): void {
    Logger.debug({ ...payload }, 'onBan');
  }

  @OnEvent('chatClearEvent')
  onClear(payload: ChatClearEventDto): void {
    Logger.debug({ ...payload }, 'onClear');
  }

  @OnEvent('chatDisconnectEvent')
  onDisconnect(payload: DisconnectEventDto): void {
    Logger.debug({ ...payload }, 'onDisconnect');
  }

  @OnEvent('chatConnectEvent')
  onConnect(): void {
    Logger.debug('onConnect');
  }

  @OnEvent('chatGiftPaidUpgradeEvent')
  onGiftPaidUpgrade(payload: GiftPaidUpgradeEventDto): void {
    Logger.debug({ ...payload }, 'onGiftPaidUpgrade');
  }

  @OnEvent('chatRaidEvent')
  onRaid(payload: RaidEventDto): void {
    Logger.debug({ ...payload }, 'onRaid');
  }

  @OnEvent('chatResubEvent')
  onResub(payload: ResubEventDto): void {
    Logger.debug({ ...payload }, 'onResub');
  }

  @OnEvent('chatSubGiftEvent')
  onSubGift(payload: SubGiftEventDto): void {
    Logger.debug({ ...payload }, 'onSubGift');
  }

  @OnEvent('chatCommunitySubEvent')
  onCommunitySub(payload: CommunitySubEventDto): void {
    Logger.debug({ ...payload }, 'onCommunitySub');
  }

  @OnEvent('chatSubEvent')
  onSub(payload: SubEventDto): void {
    Logger.debug({ ...payload }, 'onSub');
  }

  @OnEvent('chatTimeoutEvent')
  onTimeout(payload: TimeoutEventDto): void {
    Logger.debug({ ...payload }, 'onTimeout');
  }
}
