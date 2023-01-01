import { Module } from '@nestjs/common';
import { CqrsModule } from '@azkaban/shared';
import { CreateFollowerHandler } from './commands/handler/createFollower.handler';
import { UpdateStreamOnlineHandler } from './commands/handler/updateStreamOnline.handler';
import { UpdateStreamOfflineCommand } from './commands/impl/updateStreamOffline.command';
import { JoinHandler } from './events/handler/join.handler';
import { PartHandler } from './events/handler/part.handler';

const commandHandlers = [
  CreateFollowerHandler,
  UpdateStreamOnlineHandler,
  UpdateStreamOfflineCommand,
];
const queryHandlers = [];
const eventHandlers = [JoinHandler, PartHandler];
const sagas = [];

@Module({
  imports: [CqrsModule],
  providers: [...commandHandlers, ...queryHandlers, ...eventHandlers, ...sagas],
  exports: [...commandHandlers, ...queryHandlers, ...eventHandlers, ...sagas],
})
export class ApplicationModule {}
