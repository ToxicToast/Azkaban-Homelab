import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { JoinEvent } from '../impl';
import { Logger } from '@nestjs/common';

@EventsHandler(JoinEvent)
export class JoinHandler implements IEventHandler<JoinEvent> {
  handle(event: JoinEvent): void {
    Logger.debug({ event }, JoinHandler.name);
  }
}
