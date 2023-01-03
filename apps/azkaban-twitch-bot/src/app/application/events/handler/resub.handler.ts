import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ResubEvent } from '../impl';
import { Logger } from '@nestjs/common';

@EventsHandler(ResubEvent)
export class ResubHandler implements IEventHandler<ResubEvent> {
  handle(event: ResubEvent): void {
    Logger.debug({ event }, ResubHandler.name);
  }
}
