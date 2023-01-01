import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { PartEvent } from '../impl';
import { Logger } from '@nestjs/common';

@EventsHandler(PartEvent)
export class PartHandler implements IEventHandler<PartEvent> {
  handle(event: PartEvent): void {
    Logger.debug({ event }, PartHandler.name);
  }
}
