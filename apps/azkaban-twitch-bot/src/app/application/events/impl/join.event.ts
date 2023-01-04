import { IEvent } from '@nestjs/cqrs';

export class JoinEvent implements IEvent {
  constructor(
    public readonly channel: string,
    public readonly username: string
  ) {}
}
