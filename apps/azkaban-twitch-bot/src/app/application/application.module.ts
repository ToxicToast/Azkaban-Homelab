import { Module } from '@nestjs/common';
import { CqrsModule } from '@azkaban/shared';
import {
  JoinHandler,
  PartHandler,
  MessageHandler,
  ActionHandler,
  BanHandler,
  ChatClearHandler,
  ConnectHandler,
  DisconnectHandler,
  GiftPaidUpgradeHandler,
  CommunitySubHandler,
  RaidHandler,
  ResubHandler,
  SubHandler,
  SubGiftHandler,
  TimeoutHandler,
} from './events/handler';
import { AuditSaga, EventsSaga, SocketSaga } from './sagas';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { DomainModule } from '../domain/domain.module';
import { HttpModule } from '@nestjs/axios';
import { SendSocketHandler } from './commands/handler';

const commandHandlers = [SendSocketHandler];
const queryHandlers = [];
const eventHandlers = [
  JoinHandler,
  PartHandler,
  MessageHandler,
  ActionHandler,
  BanHandler,
  ChatClearHandler,
  ConnectHandler,
  DisconnectHandler,
  GiftPaidUpgradeHandler,
  CommunitySubHandler,
  RaidHandler,
  ResubHandler,
  SubHandler,
  SubGiftHandler,
  TimeoutHandler,
];
const sagas = [AuditSaga, EventsSaga, SocketSaga];

@Module({
  imports: [CqrsModule, InfrastructureModule, DomainModule, HttpModule],
  providers: [...commandHandlers, ...queryHandlers, ...eventHandlers, ...sagas],
  exports: [...commandHandlers, ...queryHandlers, ...eventHandlers, ...sagas],
})
export class ApplicationModule {}
