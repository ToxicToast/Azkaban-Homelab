import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DisconnectEvent } from '../impl';
import { Logger } from '@nestjs/common';

@EventsHandler(DisconnectEvent)
export class DisconnectHandler implements IEventHandler<DisconnectEvent> {
  handle(event: DisconnectEvent): void {
    Logger.debug({ event }, DisconnectHandler.name);
  }
}
