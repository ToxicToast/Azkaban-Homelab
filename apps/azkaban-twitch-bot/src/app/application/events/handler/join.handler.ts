import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { JoinEvent } from '../impl';

@EventsHandler(JoinEvent)
export class JoinHandler implements IEventHandler<JoinEvent> {
  handle(event: JoinEvent): void {
    //
  }
}
