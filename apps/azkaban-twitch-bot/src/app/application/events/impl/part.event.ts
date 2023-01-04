import { IEvent } from '@nestjs/cqrs';

export class PartEvent implements IEvent {
  constructor(
    public readonly channel: string,
    public readonly username: string
  ) {}
}
