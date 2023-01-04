import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { RaidEvent } from '../impl';

@EventsHandler(RaidEvent)
export class RaidHandler implements IEventHandler<RaidEvent> {
  private readonly logger: Logger = new Logger(RaidHandler.name);
  handle(event: RaidEvent): void {
    const { raidedId, raidingId } = event;
    this.logger.debug({ raidedId, raidingId });
  }
}
