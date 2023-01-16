import { FromPrimitivesParams } from '../interfaces';
import { DomainEvent } from '../classes';

export type DomainEventClass = {
  EVENT_NAME: string;
  fromPrimitives(params: FromPrimitivesParams): DomainEvent;
};
