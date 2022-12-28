import { Module } from '@nestjs/common';
import { environment } from '../environments/environment';
import {
  ApiService,
  AuthService,
  ChatService,
  EventSubService,
} from '@azkaban/shared';
import { BotService } from './bot.service';
import { EventService } from './event.service';

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
  imports: [],
  controllers: [],
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
export class AppModule {}
