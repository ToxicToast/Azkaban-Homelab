import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ConnectEvent } from '../impl';
import { Logger } from '@nestjs/common';

@EventsHandler(ConnectEvent)
export class ConnectHandler implements IEventHandler<ConnectEvent> {
  handle(event: ConnectEvent): void {
    Logger.debug({ event }, ConnectHandler.name);
  }
}
