import { DomainEvent } from '../classes';
import { DomainEventClass } from '../types';

export interface DomainEventSubscriber<Type extends DomainEvent> {
  subscribeTo(): Array<DomainEventClass>;
  on(domainEvent: Type): Promise<void>;
}
