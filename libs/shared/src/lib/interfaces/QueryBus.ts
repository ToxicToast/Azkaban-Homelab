import { Response } from './Response';
import { Query } from '../classes';

export interface QueryBus {
  ask<R extends Response>(query: Query): Promise<R>;
}
