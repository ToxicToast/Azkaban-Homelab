import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { SubEvent } from '../impl';
import { Logger } from '@nestjs/common';

@EventsHandler(SubEvent)
export class SubHandler implements IEventHandler<SubEvent> {
  handle(event: SubEvent): void {
    Logger.debug({ event }, SubHandler.name);
  }
}
