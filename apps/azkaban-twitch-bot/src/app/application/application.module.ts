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
} from './events/handler';
import { AuditSaga, MessageSaga, ViewerSaga } from './sagas';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { DomainModule } from '../domain/domain.module';

const commandHandlers = [];
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
];
const sagas = [AuditSaga, MessageSaga, ViewerSaga];

@Module({
  imports: [CqrsModule, InfrastructureModule, DomainModule],
  providers: [...commandHandlers, ...queryHandlers, ...eventHandlers, ...sagas],
  exports: [...commandHandlers, ...queryHandlers, ...eventHandlers, ...sagas],
})
export class ApplicationModule {}
