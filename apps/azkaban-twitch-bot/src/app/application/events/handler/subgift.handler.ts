import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { SubGiftEvent } from '../impl';
import { Logger } from '@nestjs/common';

@EventsHandler(SubGiftEvent)
export class SubGiftHandler implements IEventHandler<SubGiftEvent> {
  handle(event: SubGiftEvent): void {
    Logger.debug({ event }, SubGiftHandler.name);
  }
}
