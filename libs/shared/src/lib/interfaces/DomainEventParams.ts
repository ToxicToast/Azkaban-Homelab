import { Optional } from '../types';

export interface DomainEventParams {
  eventName: string;
  aggregateId: string;
  eventId?: Optional<string>;
  occuredOn?: Optional<Date>;
}
