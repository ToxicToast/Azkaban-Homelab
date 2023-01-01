import { ICommand } from '@nestjs/cqrs';

export class CreateMessageCommand implements ICommand {
  constructor(
    public readonly channelId: string,
    public readonly userId: string,
    public readonly messageId: string,
    public readonly channel: string,
    public readonly username: string,
    public readonly message: string,
    public readonly messageColor: string
  ) {}
}
