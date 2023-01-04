import { IEvent } from '@nestjs/cqrs';

export class RaidedEvent implements IEvent {
  constructor(
    public readonly raidedId: string,
    public readonly raidingId: string,
    public readonly viewers: number
  ) {}
}
