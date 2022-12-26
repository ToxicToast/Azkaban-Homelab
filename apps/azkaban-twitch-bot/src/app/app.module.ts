import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { environment } from '../environments/environment';
import { BotService } from './bot.service';

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
];

@Module({
  imports: [],
  controllers: [],
  providers: [...config, AppService, BotService],
})
export class AppModule {}
