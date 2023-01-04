import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { MessageEvent } from '../impl';
import { Logger } from '@nestjs/common';

@EventsHandler(MessageEvent)
export class MessageHandler implements IEventHandler<MessageEvent> {
  handle(event: MessageEvent): void {
    Logger.debug({ event }, MessageEvent.name);
  }
}
