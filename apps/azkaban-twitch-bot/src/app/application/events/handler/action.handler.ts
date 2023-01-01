import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ActionEvent } from '../impl';
import { Logger } from '@nestjs/common';

@EventsHandler(ActionEvent)
export class ActionHandler implements IEventHandler<ActionEvent> {
  handle(event: ActionEvent): void {
    Logger.debug({ event }, ActionHandler.name);
  }
}
