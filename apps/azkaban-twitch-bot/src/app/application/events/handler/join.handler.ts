import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { JoinEvent } from '../impl';
import { Logger } from '@nestjs/common';

@EventsHandler(JoinEvent)
export class JoinHandler implements IEventHandler<JoinEvent> {
  private readonly logger: Logger = new Logger(JoinHandler.name);

  handle(event: JoinEvent): void {
    const { channel, username } = event;
    this.logger.debug({ channel, username });
  }
}
