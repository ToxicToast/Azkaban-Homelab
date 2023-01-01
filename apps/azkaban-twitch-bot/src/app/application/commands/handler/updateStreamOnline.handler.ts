import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateStreamOnlineCommand } from '../impl/updateStreamOnline.command';
import { Logger } from '@nestjs/common';

@CommandHandler(UpdateStreamOnlineCommand)
export class UpdateStreamOnlineHandler
  implements ICommandHandler<UpdateStreamOnlineCommand>
{
  private readonly logger: Logger = new Logger(UpdateStreamOnlineHandler.name);

  async execute(command: UpdateStreamOnlineCommand): Promise<void> {
    const { id, channelId, date, type, title, thumbnail } = command;
    this.logger.debug({ id, channelId, date, type, title, thumbnail });
  }
}
