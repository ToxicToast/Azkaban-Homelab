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
  BanEvent,
  ChatClearEvent,
  DisconnectEvent,
  ConnectEvent,
  GiftPaidUpgradeEvent,
  RaidEvent,
  ResubEvent,
  SubGiftEvent,
  CommunitySubEvent,
  SubEvent,
  TimeoutEvent,
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
    this.eventBus.publish(
      new BanEvent(payload.channel, payload.username, payload.msg)
    );
  }

  @OnEvent('chatClearEvent')
  onClear(payload: ChatClearEventDto): void {
    this.eventBus.publish(new ChatClearEvent(payload.channel, payload.msg));
  }

  @OnEvent('chatDisconnectEvent')
  onDisconnect(payload: DisconnectEventDto): void {
    this.eventBus.publish(
      new DisconnectEvent(payload.manually, payload.reason)
    );
  }

  @OnEvent('chatConnectEvent')
  onConnect(): void {
    this.eventBus.publish(new ConnectEvent());
  }

  @OnEvent('chatGiftPaidUpgradeEvent')
  onGiftPaidUpgrade(payload: GiftPaidUpgradeEventDto): void {
    this.eventBus.publish(
      new GiftPaidUpgradeEvent(
        payload.channel,
        payload.username,
        payload.subInfo,
        payload.msg
      )
    );
  }

  @OnEvent('chatRaidEvent')
  onRaid(payload: RaidEventDto): void {
    this.eventBus.publish(
      new RaidEvent(
        payload.channel,
        payload.username,
        payload.raidInfo,
        payload.msg
      )
    );
  }

  @OnEvent('chatResubEvent')
  onResub(payload: ResubEventDto): void {
    this.eventBus.publish(
      new ResubEvent(
        payload.channel,
        payload.username,
        payload.subInfo,
        payload.msg
      )
    );
  }

  @OnEvent('chatSubGiftEvent')
  onSubGift(payload: SubGiftEventDto): void {
    this.eventBus.publish(
      new SubGiftEvent(
        payload.channel,
        payload.username,
        payload.subInfo,
        payload.msg
      )
    );
  }

  @OnEvent('chatCommunitySubEvent')
  onCommunitySub(payload: CommunitySubEventDto): void {
    this.eventBus.publish(
      new CommunitySubEvent(
        payload.channel,
        payload.username,
        payload.subInfo,
        payload.msg
      )
    );
  }

  @OnEvent('chatSubEvent')
  onSub(payload: SubEventDto): void {
    this.eventBus.publish(
      new SubEvent(
        payload.channel,
        payload.username,
        payload.subInfo,
        payload.msg
      )
    );
  }

  @OnEvent('chatTimeoutEvent')
  onTimeout(payload: TimeoutEventDto): void {
    this.eventBus.publish(
      new TimeoutEvent(
        payload.channel,
        payload.username,
        payload.duration,
        payload.msg
      )
    );
  }
}
