import { DomainEventClass } from '../types';
import { DomainEventJSON } from '../enums';
import { DomainEventSubscribers } from './DomainEventSubscribers';
import { DomainEventSubscriber } from '../interfaces';
import { DomainEvent } from './DomainEvent';

export class DomainEventDeserializer extends Map<string, DomainEventClass> {
  static configure(subscribers: DomainEventSubscribers) {
    const mapping = new DomainEventDeserializer();
    subscribers.items.forEach(
      (subscriber: DomainEventSubscriber<DomainEvent>) => {
        subscriber.subscribeTo().forEach(mapping.registerEvent.bind(mapping));
      }
    );
    return mapping;
  }

  private registerEvent(domainEvent: DomainEventClass): void {
    const eventName = domainEvent.EVENT_NAME;
    this.set(eventName, domainEvent);
  }

  deserialize(event: string) {
    const eventData = JSON.parse(event).data as DomainEventJSON;
    const { type, aggregateId, attributes, id, occuredOn } = eventData;
    const eventClass = super.get(type);
    if (!eventClass) {
      throw Error(`DomainEvent mapping not found for event ${type}`);
    }
    return eventClass.fromPrimitives({
      aggregateId,
      attributes,
      occuredOn: new Date(occuredOn),
      eventId: id,
    });
  }
}
