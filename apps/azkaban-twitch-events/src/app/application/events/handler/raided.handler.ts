import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { RaidedEvent } from '../impl';

@EventsHandler(RaidedEvent)
export class RaidedHandler implements IEventHandler<RaidedEvent> {
  private readonly logger: Logger = new Logger(RaidedHandler.name);
  handle(event: RaidedEvent): void {
    const { raidedId, raidingId, viewers } = event;
    this.logger.debug({ raidedId, raidingId, viewers });
  }
}
