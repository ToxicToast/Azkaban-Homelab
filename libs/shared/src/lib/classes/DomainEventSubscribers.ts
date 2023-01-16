import { DomainEventSubscriber } from '../interfaces';
import { DomainEvent } from './DomainEvent';
import { Scope } from 'eslint';

export class DomainEventSubscribers {
  constructor(public items: Array<DomainEventSubscriber<DomainEvent>>) {}

  // TODO: ContainerBuilder
  static from(
    domainEventSubscriber: DomainEventSubscriber<any>
  ): DomainEventSubscribers {
    const subscribers: Array<DomainEventSubscriber<DomainEvent>> = [];
    return new DomainEventSubscribers(subscribers);
  }
}
