import { IEvent } from '@nestjs/cqrs';

export class OfflineEvent implements IEvent {
  constructor(
    public readonly broadcasterId: string,
    public readonly broadcasterType: string,
    public readonly displayName: string,
    public readonly type: string
  ) {}
}
