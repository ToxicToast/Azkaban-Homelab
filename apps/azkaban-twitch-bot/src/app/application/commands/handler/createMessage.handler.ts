import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreateMessageCommand } from '../impl/createMessage.command';
import { MessageFactory } from '../../../domain/factories';
import { MesssageRepository } from '../../../infrastructure/repositories';
import { Nullable } from '@azkaban/shared';
import { MessageModel } from '../../../domain/models';
import { v4 as uuidv4 } from 'uuid';

@CommandHandler(CreateMessageCommand)
export class CreateMessageHandler
  implements ICommandHandler<CreateMessageCommand>
{
  constructor(
    private readonly factory: MessageFactory,
    private readonly repository: MesssageRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(
    command: CreateMessageCommand
  ): Promise<Nullable<MessageModel>> {
    const id = uuidv4();
    const message = this.publisher.mergeObjectContext(
      this.factory.createFactory({
        id,
        channel_id: command.channelId,
        user_id: command.userId,
        message_id: command.messageId,
        channel: command.channel,
        username: command.username,
        message: command.message,
        message_color: command.messageColor,
      })
    );
    message.commit();
    await this.repository.save(message);
    return message.toAnemic();
  }
}
