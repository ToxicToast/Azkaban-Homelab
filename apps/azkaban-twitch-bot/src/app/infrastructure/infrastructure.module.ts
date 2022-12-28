import { Module } from '@nestjs/common';

const mappers = [];
const repositories = [];
const entities = [];
@Module({
  imports: [],
  providers: [...mappers, ...repositories],
  exports: [...mappers, ...repositories],
})
export class InfrastructureModule {}
