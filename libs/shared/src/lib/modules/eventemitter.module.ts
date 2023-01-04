import { Module } from '@nestjs/common';
import { EventEmitterModule as BaseModule } from '@nestjs/event-emitter';
import { eventEmitterConfig } from '../configs';

@Module({
  imports: [BaseModule.forRoot(eventEmitterConfig)],
  exports: [BaseModule],
})
export class EventemitterModule {}
