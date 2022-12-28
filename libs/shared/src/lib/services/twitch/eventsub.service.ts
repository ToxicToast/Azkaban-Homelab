import { Injectable, Logger } from '@nestjs/common';
import { EventSubWsListener } from '@twurple/eventsub-ws';
import { ApiService } from './api.service';
import { EventSubHttpListener } from '@twurple/eventsub-http';
import { NgrokAdapter } from '@twurple/eventsub-ngrok';

@Injectable()
export class EventSubService {
  private readonly events: EventSubWsListener;
  private readonly staticEvents: EventSubHttpListener;

  constructor(private readonly apiService: ApiService) {
    this.events = new EventSubWsListener({
      apiClient: apiService.StaticApiProvider,
    });
    this.staticEvents = new EventSubHttpListener({
      apiClient: apiService.ClientCredentialApiProvider,
      adapter: new NgrokAdapter(),
      secret: 'ToxicToast_1990',
    });
  }

  get EventProvider(): EventSubWsListener {
    return this.events;
  }

  get StaticEventProvider(): EventSubHttpListener {
    return this.staticEvents;
  }
}
