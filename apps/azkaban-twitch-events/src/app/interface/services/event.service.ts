import {
  Inject,
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
    private readonly eventEmitter: EventEmitter2,
    @Inject('SUBSCRIPTIONCHANNELID')
    private readonly channelId: string
  ) {}

  async onModuleInit(): Promise<void> {
    await this.eventSubService.StaticEventProvider.start()
      .then(() => {
        this.subscribeToEvents();
        this.logger.debug('Events listening...');
      })
      .catch((error) => this.logger.error(error));
  }

  async onModuleDestroy(): Promise<void> {
    await this.eventSubService.StaticEventProvider.stop().then(() => {
      this.logger.debug('Events stopped...');
    });
  }

  private async subscribeToEvents(): Promise<void> {
    const userId = this.channelId;
    await this.eventSubService.StaticEventProvider.subscribeToChannelFollowEvents(
      userId,
      async (event) => {
        this.eventEmitter.emit('channelFollowEvent', {
          channelId: event.broadcasterId,
          followerId: event.userId,
          date: event.followDate,
        });
      }
    );
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
          title: stream?.title ?? '',
          thumbnail: stream?.thumbnailUrl ?? '',
        });
      }
    );
    //
    await this.eventSubService.StaticEventProvider.subscribeToStreamOfflineEvents(
      userId,
      async (event) => {
        const broadcaster = await event.getBroadcaster();
        //
        this.eventEmitter.emit('streamOfflineEvent', {
          broadcasterId: event.broadcasterId,
          broadcasterType: broadcaster?.broadcasterType,
          displayName: broadcaster?.displayName,
          type: broadcaster?.type,
        });
      }
    );
  }
}
