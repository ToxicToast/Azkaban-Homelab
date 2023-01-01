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
  {
    provide: 'SUBSCRIPTIONCHANNELID',
    useFactory: () => {
      return environment.subscriptionChannelId;
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
