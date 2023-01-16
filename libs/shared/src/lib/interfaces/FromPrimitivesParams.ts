import { DomainEventAttributes } from '../types';

export interface FromPrimitivesParams {
  aggregateId: string;
  eventId: string;
  occuredOn: Date;
  attributes: DomainEventAttributes;
}
