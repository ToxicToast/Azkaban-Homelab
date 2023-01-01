import { Controller } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { OnEvent } from '@nestjs/event-emitter';
import {
  ChannelFollowDto,
  ChannelRaidDto,
  ChannelRaidedDto,
  StreamOfflineDto,
  StreamOnlineDto,
} from '../dtos';
import {
  FollowerEvent,
  OfflineEvent,
  OnlineEvent,
  RaidedEvent,
  RaidEvent,
} from '../../application/events/impl';

@Controller('event')
export class EventController {
  constructor(private readonly eventBus: EventBus) {}

  @OnEvent('channelFollowEvent')
  async onNewFollower(payload: ChannelFollowDto): Promise<void> {
    await this.eventBus.publish(
      new FollowerEvent(payload.channelId, payload.followerId, payload.date)
    );
  }

  @OnEvent('streamOnlineEvent')
  async onStreamOnline(payload: StreamOnlineDto): Promise<void> {
    await this.eventBus.publish(
      new OnlineEvent(
        payload.id,
        payload.channelId,
        payload.type,
        payload.date,
        payload.title,
        payload.thumbnail
      )
    );
  }

  @OnEvent('streamOfflineEvent')
  async onStreamOffline(payload: StreamOfflineDto): Promise<void> {
    await this.eventBus.publish(
      new OfflineEvent(
        payload.broadcasterId,
        payload.broadcasterType,
        payload.displayName,
        payload.type
      )
    );
  }

  @OnEvent('channelRaidedEvent')
  async onChannelRaided(payload: ChannelRaidedDto): Promise<void> {
    await this.eventBus.publish(
      new RaidedEvent(payload.raidedId, payload.raidingId, payload.viewers)
    );
  }

  @OnEvent('channelRaidEvent')
  async onChannelRaid(payload: ChannelRaidDto): Promise<void> {
    await this.eventBus.publish(
      new RaidEvent(payload.raidedId, payload.raidingId)
    );
  }
}
