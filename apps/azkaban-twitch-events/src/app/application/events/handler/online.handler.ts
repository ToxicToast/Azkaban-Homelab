import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { OnlineEvent } from '../impl';

@EventsHandler(OnlineEvent)
export class OnlineHandler implements IEventHandler<OnlineEvent> {
  private readonly logger: Logger = new Logger(OnlineHandler.name);
  handle(event: OnlineEvent): void {
    const { channelId, id, type, date, title, thumbnail } = event;
    this.logger.debug({ channelId, id, type, date, title, thumbnail });
  }
}
