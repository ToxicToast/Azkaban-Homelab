import { Controller } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ChannelFollowDto } from '../dtos/channelFollow.dto';
import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';
import { FollowerEvent } from '../../application/events/impl/follower.event';
import { StreamStatusDto } from '../dtos/streamStatus.dto';
import { OnlineEvent } from '../../application/events/impl/online.event';

@Controller('event')
export class EventController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    private readonly eventBus: EventBus
  ) {}

  @OnEvent('channelFollowEvent')
  async onNewFollower(payload: ChannelFollowDto): Promise<void> {
    await this.eventBus.publish(
      new FollowerEvent(payload.channelId, payload.followerId, payload.date)
    );
  }

  @OnEvent('streamOnlineEvent')
  async onStreamOnline(payload: StreamStatusDto): Promise<void> {
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
}
