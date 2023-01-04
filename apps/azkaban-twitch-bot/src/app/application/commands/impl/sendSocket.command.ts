import { ICommand } from '@nestjs/cqrs';

export class SendSocketCommand implements ICommand {
  constructor(public readonly type: string, public readonly data: unknown) {}
}
