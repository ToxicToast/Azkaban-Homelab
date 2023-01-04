import { ICommand } from '@nestjs/cqrs';

export class UpdateStreamOnlineCommand implements ICommand {
  constructor(
    public readonly id: string,
    public readonly channelId: string,
    public readonly type: string,
    public readonly date: Date,
    public readonly title: string,
    public readonly thumbnail: string
  ) {}
}
