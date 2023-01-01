import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateFollowerCommand } from '../impl/createFollower.command';
import { Logger } from '@nestjs/common';

@CommandHandler(CreateFollowerCommand)
export class CreateFollowerHandler
  implements ICommandHandler<CreateFollowerCommand>
{
  private readonly logger: Logger = new Logger(CreateFollowerHandler.name);

  async execute(command: CreateFollowerCommand): Promise<void> {
    const { channelId, followerId, date } = command;
    this.logger.debug({ channelId, followerId, date });
  }
}
