import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { TimeoutEvent } from '../impl';
import { Logger } from '@nestjs/common';

@EventsHandler(TimeoutEvent)
export class TimeoutHandler implements IEventHandler<TimeoutEvent> {
  handle(event: TimeoutEvent): void {
    Logger.debug({ event }, TimeoutHandler.name);
  }
}
