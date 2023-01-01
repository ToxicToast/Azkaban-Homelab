/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { TcpOptions, Transport } from '@nestjs/microservices';
import { environment } from './environments/environment';

async function bootstrap() {
  Logger.debug({ environment });
  const app = await NestFactory.createMicroservice<TcpOptions>(AppModule, {
    transport: Transport.TCP,
    options: {
      port: environment.port,
    },
  });
  app.enableShutdownHooks();
  await app.listen();
  Logger.log(`🚀 Twitch-Event is running`);
}

bootstrap();
