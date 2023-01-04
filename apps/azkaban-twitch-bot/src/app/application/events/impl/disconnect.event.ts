import { IEvent } from '@nestjs/cqrs';

export class DisconnectEvent implements IEvent {
  constructor(
    public readonly manually: boolean,
    public readonly reason: Error
  ) {}
}
