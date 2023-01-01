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

  @OnEvent('*')
  audit(payload): void {
    Logger.debug({ ...payload }, 'Audit');
  }
}
