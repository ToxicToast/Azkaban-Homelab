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
import { Module } from '@nestjs/common';
import { EventService } from './services/event.service';
import { EventController } from './controllers/event.controller';
import { ApplicationModule } from '../application/application.module';

const config = [
  {
    provide: 'EXPIRESIN',
    useFactory: () => {
      return environment.twitch.expires_in;
    },
  },
  {
    provide: 'OBTAINMENTTIMESTAMP',
    useFactory: () => {
      return environment.twitch.obtainment_timestamp;
    },
  },
  {
    provide: 'ACCESSTOKEN',
    useFactory: () => {
      return environment.twitch.access_token;
    },
  },
  {
    provide: 'REFRESHTOKEN',
    useFactory: () => {
      return environment.twitch.refresh_token;
    },
  },
  {
    provide: 'SCOPE',
    useFactory: () => {
      return environment.twitch.scope;
    },
  },
  {
    provide: 'CLIENTID',
    useFactory: () => {
      return environment.twitch.client_id;
    },
  },
  {
    provide: 'CLIENTSECRET',
    useFactory: () => {
      return environment.twitch.client_secret;
    },
  },
  {
    provide: 'CHANNELS',
    useFactory: () => {
      return environment.twitch.channels;
    },
  },
  {
    provide: 'SUBSCRIPTIONSECRET',
    useFactory: () => {
      return environment.twitch.subscriptionSecret;
    },
  },
  {
    provide: 'SUBSCRIPTIONCHANNELID',
    useFactory: () => {
      return environment.twitch.subscriptionChannelId;
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
    EventService,
  ],
})
export class InterfaceModule {}
