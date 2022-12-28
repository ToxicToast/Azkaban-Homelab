import { Module } from '@nestjs/common';
import { EventEmitterModule as BaseModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    BaseModule.forRoot({
      wildcard: false,
      delimiter: '.',
      newListener: true,
      removeListener: true,
      verboseMemoryLeak: true,
    }),
  ],
  exports: [BaseModule],
})
export class EventemitterModule {}
