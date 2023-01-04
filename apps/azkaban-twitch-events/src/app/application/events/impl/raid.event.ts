import { IEvent } from '@nestjs/cqrs';

export class RaidEvent implements IEvent {
  constructor(
    public readonly raidedId: string,
    public readonly raidingId: string
  ) {}
}
