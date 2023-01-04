export const environment = {
  production: false,
  port: Number(process.env.port ?? 3334),
  gateway: {
    host: process.env.gateway_host ?? 'http://localhost',
    port: Number(process.env.gateway_port ?? 3333),
  },
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
  database: {
    host: process.env.database_host ?? 'localhost',
    port: Number(process.env.database_port) ?? 3306,
    username: process.env.database_username ?? 'root',
    password: process.env.database_password ?? 'root',
  },
};
