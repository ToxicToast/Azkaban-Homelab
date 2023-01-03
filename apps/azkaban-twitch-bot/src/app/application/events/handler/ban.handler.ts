import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { BanEvent } from '../impl';
import { Logger } from '@nestjs/common';

@EventsHandler(BanEvent)
export class BanHandler implements IEventHandler<BanEvent> {
  handle(event: BanEvent): void {
    Logger.debug({ event }, BanHandler.name);
  }
}
