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
import { EventService } from './services/event.service';
import { Module } from '@nestjs/common';
import { EventController } from './controllers/event.controller';

const config = [
  {
    provide: 'EXPIRESIN',
    useFactory: () => {
      return environment.expires_in;
    },
  },
  {
    provide: 'OBTAINMENTTIMESTAMP',
    useFactory: () => {
      return environment.obtainment_timestamp;
    },
  },
  {
    provide: 'ACCESSTOKEN',
    useFactory: () => {
      return environment.access_token;
    },
  },
  {
    provide: 'REFRESHTOKEN',
    useFactory: () => {
      return environment.refresh_token;
    },
  },
  {
    provide: 'SCOPE',
    useFactory: () => {
      return environment.scope;
    },
  },
  {
    provide: 'CLIENTID',
    useFactory: () => {
      return environment.client_id;
    },
  },
  {
    provide: 'CLIENTSECRET',
    useFactory: () => {
      return environment.client_secret;
    },
  },
  {
    provide: 'CHANNELS',
    useFactory: () => {
      return environment.channels;
    },
  },
  {
    provide: 'SUBSCRIPTIONSECRET',
    useFactory: () => {
      return environment.subscriptionSecret;
    },
  },
];
@Module({
  imports: [HealthModule, CqrsModule, EventemitterModule, ApplicationModule],
  controllers: [EventController],
  providers: [
    ...config,
    ChatService,
    ApiService,
    EventSubService,
    AuthService,
    BotService,
    EventService,
  ],
})
export class InterfaceModule {}
