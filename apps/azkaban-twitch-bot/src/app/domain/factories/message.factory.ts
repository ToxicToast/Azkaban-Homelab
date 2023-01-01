import { Injectable } from '@nestjs/common';
import { Factory } from '@azkaban/shared';
import { CreateMessage, MessageModel } from '../models';
import { MessageAggregate } from '../aggregates';

@Injectable()
export class MessageFactory
  implements Factory<MessageModel, MessageAggregate, CreateMessage>
{
  reconstitute(anemic: MessageModel): MessageAggregate {
    const {
      id,
      channel_id,
      message_id,
      user_id,
      channel,
      username,
      message,
      message_color,
      active,
      created_at,
      updated_at,
      deleted_at,
    } = anemic;
    return new MessageAggregate(
      id,
      channel_id,
      user_id,
      message_id,
      channel,
      username,
      message,
      message_color,
      active,
      created_at,
      updated_at,
      deleted_at
    );
  }

  constitute(domain: MessageAggregate): MessageModel {
    return domain.toAnemic();
  }

  createFactory(data: CreateMessage): MessageAggregate {
    const {
      id,
      channel_id,
      user_id,
      message_id,
      channel,
      username,
      message,
      message_color,
    } = data;
    const domain = new MessageAggregate(
      id,
      channel_id,
      user_id,
      message_id,
      channel,
      username,
      message,
      message_color,
      true,
      new Date(),
      null,
      null
    );
    domain.create();
    return domain;
  }
}
