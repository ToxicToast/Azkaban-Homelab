import { ICommand } from '@nestjs/cqrs';

export class UpdateStreamOfflineCommand implements ICommand {
  constructor(
    public readonly broadcasterId: string,
    public readonly broadcasterType: string,
    public readonly displayName: string,
    public readonly type: string
  ) {}
}
