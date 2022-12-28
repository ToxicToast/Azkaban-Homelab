import * as process from 'process';

export const environment = {
  production: false,
  PORT: Number(process.env.PORT) ?? 3333,
  client_id: process.env.client_id ?? '',
  client_secret: process.env.client_secret ?? '',
  refresh_token: process.env.refresh_token ?? '',
  access_token: process.env.access_token ?? '',
  expires_in: process.env.expires_in ?? 0,
  scope: process.env?.scope?.split(',') ?? [],
  obtainment_timestamp: process.env.obtainment_timestamp ?? 0,
  channels: process.env?.channels?.split(',') ?? [],
  subscriptionSecret:
    process.env.subscription_secret ?? 'Azkaban-Twitch-Secret',
};
