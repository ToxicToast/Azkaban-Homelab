import { Module } from '@nestjs/common';
import { CqrsModule } from '@azkaban/shared';
import { AuditSaga, ChannelSaga, StreamSaga, ViewerSaga } from './sagas';
import {
  FollowerHandler,
  OfflineHandler,
  OnlineHandler,
  RaidedHandler,
  RaidHandler,
} from './events/handler';

const commandHandlers = [];
const queryHandlers = [];
const eventHandlers = [
  OnlineHandler,
  OfflineHandler,
  RaidedHandler,
  RaidHandler,
  FollowerHandler,
];
const sagas = [ChannelSaga, StreamSaga, ViewerSaga, AuditSaga];

@Module({
  imports: [CqrsModule],
  providers: [...commandHandlers, ...queryHandlers, ...eventHandlers, ...sagas],
  exports: [...commandHandlers, ...queryHandlers, ...eventHandlers, ...sagas],
})
export class ApplicationModule {}
