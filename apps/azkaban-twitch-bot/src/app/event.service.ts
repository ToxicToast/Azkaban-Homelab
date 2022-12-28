import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { EventSubService } from '@azkaban/shared';
import { rawDataSymbol } from '@twurple/common';

@Injectable()
export class EventService implements OnModuleInit, OnModuleDestroy {
  private readonly logger: Logger = new Logger(EventService.name);

  constructor(private readonly eventSubService: EventSubService) {}

  async onModuleInit(): Promise<void> {
    await this.eventSubService.StaticEventProvider.start().then(() => {
      this.subscribeToMyEvents();
      this.subscribeToOtherEvents();
    });
  }

  async onModuleDestroy(): Promise<void> {
    await this.eventSubService.StaticEventProvider.stop();
  }

  private async subscribeToMyEvents(): Promise<void> {
    const userId = '28004350';
    const newFollower =
      await this.eventSubService.StaticEventProvider.subscribeToChannelFollowEvents(
        userId,
        (event) =>
          this.logger.debug({
            channelId: event.broadcasterId,
            followerId: event.userId,
            date: event.followDate,
            debug: event[rawDataSymbol],
          })
      );
    //
    const raided =
      await this.eventSubService.StaticEventProvider.subscribeToChannelRaidEventsFrom(
        userId,
        (event) =>
          this.logger.debug({
            raidedId: event.raidedBroadcasterId,
            raidingId: event.raidingBroadcasterId,
            viewers: event.viewers,
            debug: event[rawDataSymbol],
          })
      );
    //
    const raids =
      await this.eventSubService.StaticEventProvider.subscribeToChannelRaidEventsTo(
        userId,
        (event) =>
          this.logger.debug({
            raidedId: event.raidedBroadcasterId,
            raidingId: event.raidingBroadcasterId,
            debug: event[rawDataSymbol],
          })
      );
    //
    const online =
      await this.eventSubService.StaticEventProvider.subscribeToStreamOnlineEvents(
        userId,
        async (event) => {
          const stream = await event.getStream();
          const broadcaster = await event.getBroadcaster();
          //
          this.logger.debug({
            id: event.id,
            channelId: event.broadcasterId,
            type: event.type,
            date: event.startDate,
            stream: stream,
            broadcaster: broadcaster,
            debug: event[rawDataSymbol],
          });
        }
      );
    //
    this.logger.debug(await newFollower.getCliTestCommand());
    this.logger.debug(await raided.getCliTestCommand());
    this.logger.debug(await raids.getCliTestCommand());
    this.logger.debug(await online.getCliTestCommand());
  }
  private async subscribeToOtherEvents(): Promise<void> {
    const maryOnline =
      await this.eventSubService.StaticEventProvider.subscribeToStreamOnlineEvents(
        '47834860',
        async (event) => {
          const stream = await event.getStream();
          const broadcaster = await event.getBroadcaster();
          //
          this.logger.debug({
            id: event.id,
            channelId: event.broadcasterId,
            type: event.type,
            date: event.startDate,
            stream: stream,
            broadcaster: broadcaster,
            debug: event[rawDataSymbol],
          });
        }
      );
    //
    this.logger.debug(await maryOnline.getCliTestCommand());
  }
}
