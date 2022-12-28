import { Module } from '@nestjs/common';

const factories = [];

@Module({
  providers: [...factories],
  exports: [...factories],
})
export class DomainModule {}
