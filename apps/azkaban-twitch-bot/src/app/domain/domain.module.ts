import { Module } from '@nestjs/common';
import { MessageFactory } from './factories';

const factories = [MessageFactory];

@Module({
  providers: [...factories],
  exports: [...factories],
})
export class DomainModule {}
