import { DomainEvent } from './DomainEvent';

export class DomainEventJsonSerializer {
  static serialize(event: DomainEvent): string {
    return JSON.stringify({
      data: {
        id: event.eventId,
        type: event.eventName,
        occuredOn: event.occuredOn.toISOString(),
        aggregateId: event.aggregateId,
        attributes: event.toPrimitives(),
      },
    });
  }
}
