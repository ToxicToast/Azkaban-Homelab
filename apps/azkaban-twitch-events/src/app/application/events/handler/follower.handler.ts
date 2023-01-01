import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { FollowerEvent } from '../impl';

@EventsHandler(FollowerEvent)
export class FollowerHandler implements IEventHandler<FollowerEvent> {
  private readonly logger: Logger = new Logger(FollowerHandler.name);
  handle(event: FollowerEvent): void {
    const { channelId, followerId, date } = event;
    this.logger.debug({ channelId, followerId, date });
  }
}
