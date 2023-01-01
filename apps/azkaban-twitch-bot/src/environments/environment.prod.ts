export const environment = {
  production: true,
  port: Number(process.env.PORT) ?? 3333,
  twtich: {
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
  },
};
