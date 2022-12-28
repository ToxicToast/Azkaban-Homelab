import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { FollowerEvent } from '../impl/follower.event';
import { Logger } from '@nestjs/common';

@EventsHandler(FollowerEvent)
export class FollowerHandler implements IEventHandler<FollowerEvent> {
  private readonly logger: Logger = new Logger(FollowerHandler.name);
  handle(event: FollowerEvent): void {
    const { channelId, followerId, date } = event;
    this.logger.debug({ channelId, followerId, date });
  }
}
