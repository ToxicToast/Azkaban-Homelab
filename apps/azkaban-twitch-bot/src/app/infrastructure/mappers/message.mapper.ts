import { Injectable } from '@nestjs/common';
import { Mapper } from '@azkaban/shared';
import { MessageAggregate } from '../../domain/aggregates';
import { MessageEntity } from '../entities';
import { MessageFactory } from '../../domain/factories';

@Injectable()
export class MessageMapper implements Mapper<MessageAggregate, MessageEntity> {
  constructor(private readonly factory: MessageFactory) {}

  domainToEntity(domain: MessageAggregate): MessageEntity {
    const anemic = domain.toAnemic();
    const entity = new MessageEntity();
    entity.id = anemic.id;
    entity.channel_id = anemic.channel_id;
    entity.user_id = anemic.user_id;
    entity.message_id = anemic.message_id;
    entity.channel = anemic.channel;
    entity.username = anemic.username;
    entity.message = anemic.message;
    entity.message_color = anemic.message_color;
    entity.active = anemic.active;
    entity.created_at = anemic.created_at;
    entity.updated_at = anemic.updated_at;
    entity.deleted_at = anemic.deleted_at;
    return entity;
  }

  entityToDomain(entity: MessageEntity): MessageAggregate {
    return this.factory.reconstitute({
      ...entity,
      isActive: entity.active,
      isUpdated: !!entity.updated_at,
      isDeleted: !!entity.deleted_at,
    });
  }
}
