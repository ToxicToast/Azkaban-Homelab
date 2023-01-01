import { Controller } from '@nestjs/common';
import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';
import { OnEvent } from '@nestjs/event-emitter';
import { JoinEvent } from '../../application/events/impl/join.event';
import { PartEvent } from '../../application/events/impl/part.event';
import { JoinEventDto, PartEventDto } from '../dtos/viewerStatus.dto';

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
}
