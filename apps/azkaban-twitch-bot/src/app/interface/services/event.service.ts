import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { EventSubService } from '@azkaban/shared';
import { rawDataSymbol } from '@twurple/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class EventService implements OnModuleInit, OnModuleDestroy {
  private readonly logger: Logger = new Logger(EventService.name);

  constructor(
    private readonly eventSubService: EventSubService,
    private readonly eventEmitter: EventEmitter2
  ) {}

  async onModuleInit(): Promise<void> {
    await this.eventSubService.StaticEventProvider.start().then(() => {
      this.subscribeToMyEvents();
      this.subscribeToMaryEvents();
      this.logger.debug('Events listening...');
    });
  }

  async onModuleDestroy(): Promise<void> {
    await this.eventSubService.StaticEventProvider.stop().then(() => {
      this.logger.debug('Events stopped...');
    });
  }

  private async subscribeToMyEvents(): Promise<void> {
    const userId = '28004350';
    const follower =
      await this.eventSubService.StaticEventProvider.subscribeToChannelFollowEvents(
        userId,
        async (event) => {
          const broadcaster = await event.getBroadcaster();
          //
          this.eventEmitter.emit('channelFollowEvent', {
            channelId: event.broadcasterId,
            followerId: event.userId,
            date: event.followDate,
          });
        }
      );
    this.logger.debug(await follower.getCliTestCommand());
    //
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
          //
          this.eventEmitter.emit('streamOnlineEvent', {
            id: event.id,
            channelId: event.broadcasterId,
            type: event.type,
            date: event.startDate,
            title: stream.title ?? '',
            thumbnail: stream.thumbnailUrl ?? '',
          });
        }
      );
    this.logger.debug(await online.getCliTestCommand());
    //
    await this.eventSubService.StaticEventProvider.subscribeToStreamOfflineEvents(
      userId,
      async (event) => {
        const broadcaster = await event.getBroadcaster();
        //
        this.logger.debug({
          channelId: event.broadcasterId,
          broadcaster: {
            broadcasterType: broadcaster.broadcasterType,
            displayName: broadcaster.displayName,
            type: broadcaster.type,
          },
          debug: event[rawDataSymbol],
        });
      }
    );
  }
  private async subscribeToMaryEvents(): Promise<void> {
    const userId = '47834860';
    await this.eventSubService.StaticEventProvider.subscribeToStreamOnlineEvents(
      userId,
      async (event) => {
        const stream = await event.getStream();
        //
        this.eventEmitter.emit('streamOnlineEvent', {
          id: event.id,
          channelId: event.broadcasterId,
          type: event.type,
          date: event.startDate,
          title: stream.title ?? '',
          thumbnail: stream.thumbnailUrl ?? '',
        });
      }
    );
    await this.eventSubService.StaticEventProvider.subscribeToStreamOfflineEvents(
      userId,
      async (event) => {
        const broadcaster = await event.getBroadcaster();
        //
        this.logger.debug({
          channelId: event.broadcasterId,
          broadcaster: {
            broadcasterType: broadcaster.broadcasterType,
            displayName: broadcaster.displayName,
            type: broadcaster.type,
          },
          debug: event[rawDataSymbol],
        });
      }
    );
  }
}
