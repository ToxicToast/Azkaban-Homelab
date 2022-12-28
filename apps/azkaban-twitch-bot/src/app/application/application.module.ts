import { Module } from '@nestjs/common';
import { CqrsModule } from '@azkaban/shared';
import { CreateFollowerHandler } from './commands/handler/createFollower.handler';
import { FollowerHandler } from './events/handler/follower.handler';
import { EventsSaga } from './sagas/events.saga';

const commandHandlers = [CreateFollowerHandler];
const queryHandlers = [];
const eventHandlers = [FollowerHandler];
const sagas = [EventsSaga];

@Module({
  imports: [CqrsModule],
  providers: [...commandHandlers, ...queryHandlers, ...eventHandlers, ...sagas],
  exports: [...commandHandlers, ...queryHandlers, ...eventHandlers, ...sagas],
})
export class ApplicationModule {}
