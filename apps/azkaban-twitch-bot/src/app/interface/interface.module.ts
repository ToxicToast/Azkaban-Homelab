import { ApplicationModule } from '../application/application.module';
import {
  ApiService,
  AuthService,
  ChatService,
  CqrsModule,
  HealthModule,
  EventSubService,
  EventemitterModule,
} from '@azkaban/shared';
import { environment } from '../../environments/environment';
import { BotService } from './services/bot.service';
import { Module } from '@nestjs/common';
import { BotController } from './controllers/bot.controller';

const config = [
  {
    provide: 'EXPIRESIN',
    useFactory: () => {
      return environment.twtich.expires_in;
    },
  },
  {
    provide: 'OBTAINMENTTIMESTAMP',
    useFactory: () => {
      return environment.twtich.obtainment_timestamp;
    },
  },
  {
    provide: 'ACCESSTOKEN',
    useFactory: () => {
      return environment.twtich.access_token;
    },
  },
  {
    provide: 'REFRESHTOKEN',
    useFactory: () => {
      return environment.twtich.refresh_token;
    },
  },
  {
    provide: 'SCOPE',
    useFactory: () => {
      return environment.twtich.scope;
    },
  },
  {
    provide: 'CLIENTID',
    useFactory: () => {
      return environment.twtich.client_id;
    },
  },
  {
    provide: 'CLIENTSECRET',
    useFactory: () => {
      return environment.twtich.client_secret;
    },
  },
  {
    provide: 'CHANNELS',
    useFactory: () => {
      return environment.twtich.channels;
    },
  },
  {
    provide: 'SUBSCRIPTIONSECRET',
    useFactory: () => {
      return environment.twtich.subscriptionSecret;
    },
  },
];
@Module({
  imports: [HealthModule, CqrsModule, EventemitterModule, ApplicationModule],
  controllers: [BotController],
  providers: [
    ...config,
    ChatService,
    ApiService,
    EventSubService,
    AuthService,
    BotService,
  ],
})
export class InterfaceModule {}
