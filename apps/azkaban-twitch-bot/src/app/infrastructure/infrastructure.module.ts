import { Module } from '@nestjs/common';
import { environment } from '../../environments/environment';
import { MessageEntity } from './entities';
import { MesssageRepository } from './repositories';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DomainModule } from '../domain/domain.module';
import { MessageMapper } from './mappers';
import { DataSource } from 'typeorm';

const mappers = [MessageMapper];
const repositories = [MesssageRepository];
const entities = [MessageEntity];
const repositoryProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () =>
      new DataSource({
        name: 'default',
        type: 'mysql',
        host: environment.database.host,
        port: environment.database.port,
        username: environment.database.username,
        password: environment.database.password,
        database: 'azkaban-twitch-bot',
        entities,
        synchronize: false,
      }).initialize(),
  },
  {
    provide: 'MESSAGE_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(MessageEntity),
    inject: ['DATA_SOURCE'],
  },
];
@Module({
  imports: [
    DomainModule,
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        name: 'default',
        type: 'mysql',
        host: environment.database.host,
        port: environment.database.port,
        username: environment.database.username,
        password: environment.database.password,
        database: 'azkaban-twitch-bot',
        entities,
        synchronize: true,
        retryAttempts: 3,
        retryDelay: 1000,
        verboseRetryLog: true,
        autoLoadEntities: true,
      }),
    }),
  ],
  providers: [...mappers, ...repositories, ...repositoryProviders],
  exports: [...mappers, ...repositories],
})
export class InfrastructureModule {}
