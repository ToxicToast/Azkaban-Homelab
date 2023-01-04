import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CommunitySubEvent } from '../impl';
import { Logger } from '@nestjs/common';

@EventsHandler(CommunitySubEvent)
export class CommunitySubHandler implements IEventHandler<CommunitySubEvent> {
  handle(event: CommunitySubEvent): void {
    Logger.debug({ event }, CommunitySubHandler.name);
  }
}
