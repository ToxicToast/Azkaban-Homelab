import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { RaidEvent } from '../impl';
import { Logger } from '@nestjs/common';

@EventsHandler(RaidEvent)
export class RaidHandler implements IEventHandler<RaidEvent> {
  handle(event: RaidEvent): void {
    Logger.debug({ event }, RaidHandler.name);
  }
}
