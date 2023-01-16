import { DomainEvent } from '../classes';

export interface EventBus {
  publish(events: Array<DomainEvent>): Promise<void>;
  addSubscribers(subscribers: any): void; // TODO: DomainEventSubscribers
}
