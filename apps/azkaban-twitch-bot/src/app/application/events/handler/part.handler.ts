import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { PartEvent } from '../impl';

@EventsHandler(PartEvent)
export class PartHandler implements IEventHandler<PartEvent> {
  handle(event: PartEvent): void {
    //
  }
}
