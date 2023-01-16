import { DomainEventParams, FromPrimitivesParams } from '../interfaces';
import { DomainEventAttributes } from '../types';
import { UuidValueObject } from './UuidValueObject';

export abstract class DomainEvent {
  static EVENT_NAME: string;
  static fromPrimitives: (params: FromPrimitivesParams) => DomainEvent;

  readonly aggregateId: string;
  readonly eventId: string;
  readonly occuredOn: Date;
  readonly eventName: string;

  constructor(params: DomainEventParams) {
    const { aggregateId, eventName, eventId, occuredOn } = params;
    this.aggregateId = aggregateId;
    this.eventName = eventName;
    this.eventId = eventId ?? UuidValueObject.random().value;
    this.occuredOn = occuredOn ?? new Date();
  }

  abstract toPrimitives(): DomainEventAttributes;
}
