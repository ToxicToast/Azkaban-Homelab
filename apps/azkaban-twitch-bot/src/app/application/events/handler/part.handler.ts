import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { PartEvent } from '../impl';
import { Logger } from '@nestjs/common';

@EventsHandler(PartEvent)
export class PartHandler implements IEventHandler<PartEvent> {
  private readonly logger: Logger = new Logger(PartHandler.name);

  handle(event: PartEvent): void {
    const { channel, username } = event;
    this.logger.debug({ channel, username });
  }
}
