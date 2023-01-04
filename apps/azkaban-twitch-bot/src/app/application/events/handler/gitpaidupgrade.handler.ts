import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { GiftPaidUpgradeEvent } from '../impl';
import { Logger } from '@nestjs/common';

@EventsHandler(GiftPaidUpgradeEvent)
export class GiftPaidUpgradeHandler
  implements IEventHandler<GiftPaidUpgradeEvent>
{
  handle(event: GiftPaidUpgradeEvent): void {
    Logger.debug({ event }, GiftPaidUpgradeHandler.name);
  }
}
