import { Module } from '@nestjs/common';
import { environment } from '../../environments/environment';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DomainModule } from '../domain/domain.module';
import { DataSource } from 'typeorm';

const mappers = [];
const repositories = [];
const entities = [];
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
        database: 'azkaban-twitch',
        entities,
        synchronize: false,
      }).initialize(),
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
        database: 'azkaban-twitch',
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
