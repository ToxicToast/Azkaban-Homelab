import { ICommand } from '@nestjs/cqrs';

export class CreateFollowerCommand implements ICommand {
  constructor(
    public readonly channelId: string,
    public readonly followerId: string,
    public readonly date: Date
  ) {}
}
