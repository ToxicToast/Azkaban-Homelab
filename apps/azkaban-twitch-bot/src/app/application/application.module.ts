import { Module } from '@nestjs/common';
import { CqrsModule } from '@azkaban/shared';
import { JoinHandler, PartHandler, MessageHandler } from './events/handler';
import { AuditSaga, MessageSaga } from './sagas';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { CreateMessageHandler } from './commands/handler/createMessage.handler';
import { DomainModule } from '../domain/domain.module';

const commandHandlers = [CreateMessageHandler];
const queryHandlers = [];
const eventHandlers = [JoinHandler, PartHandler, MessageHandler];
const sagas = [AuditSaga, MessageSaga];

@Module({
  imports: [CqrsModule, InfrastructureModule, DomainModule],
  providers: [...commandHandlers, ...queryHandlers, ...eventHandlers, ...sagas],
  exports: [...commandHandlers, ...queryHandlers, ...eventHandlers, ...sagas],
})
export class ApplicationModule {}
