import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { MessageEvent } from '../impl';
import { Logger } from '@nestjs/common';

@EventsHandler(MessageEvent)
export class MessageHandler implements IEventHandler<MessageEvent> {
  private readonly logger: Logger = new Logger(MessageHandler.name);

  handle(event: MessageEvent): void {
    const {
      channel,
      username,
      message,
      messageId,
      messageColor,
      userId,
      channelId,
    } = event;
    this.logger.debug({
      channel,
      username,
      message,
      messageId,
      messageColor,
      userId,
      channelId,
    });
  }
}
