import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ChatClearEvent } from '../impl';
import { Logger } from '@nestjs/common';

@EventsHandler(ChatClearEvent)
export class ChatClearHandler implements IEventHandler<ChatClearEvent> {
  handle(event: ChatClearEvent): void {
    Logger.debug({ event }, ChatClearHandler.name);
  }
}
