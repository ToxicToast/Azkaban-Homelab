import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { OfflineEvent } from '../impl';

@EventsHandler(OfflineEvent)
export class OfflineHandler implements IEventHandler<OfflineEvent> {
  private readonly logger: Logger = new Logger(OfflineHandler.name);
  handle(event: OfflineEvent): void {
    const { broadcasterId, broadcasterType, displayName, type } = event;
    this.logger.debug({ broadcasterId, broadcasterType, displayName, type });
  }
}
