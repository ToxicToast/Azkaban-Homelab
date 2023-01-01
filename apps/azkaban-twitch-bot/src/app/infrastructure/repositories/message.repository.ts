import { Inject, Injectable, Logger } from '@nestjs/common';
import { Nullable, Repository, SaveEntityFunc } from '@azkaban/shared';
import { Repository as TypeRepository } from 'typeorm';
import { MessageAggregate } from '../../domain/aggregates';
import { MessageEntity } from '../entities';
import { MessageMapper } from '../mappers';

@Injectable()
export class MesssageRepository implements Repository<MessageAggregate> {
  private readonly logger: Logger = new Logger(MesssageRepository.name);
  constructor(
    private readonly mapper: MessageMapper,
    @Inject('MESSAGE_REPOSITORY')
    private readonly messageRepository: TypeRepository<MessageEntity>
  ) {}

  async save(domain: MessageAggregate): Promise<void> {
    try {
      await SaveEntityFunc<
        MessageMapper,
        MessageAggregate,
        TypeRepository<MessageEntity>
      >(this.mapper, domain, this.messageRepository);
    } catch (e) {
      this.logger.error(e);
    }
  }

  findList(): Promise<Nullable<Array<MessageAggregate>>> {
    try {
      return null;
    } catch (e) {
      this.logger.error(e);
    }
  }

  findById(id: string): Promise<Nullable<MessageAggregate>> {
    try {
      return null;
    } catch (e) {
      this.logger.error(e);
    }
  }

  findByChannelId(
    channel_id: string
  ): Promise<Nullable<Array<MessageAggregate>>> {
    try {
      Logger.debug({ channel_id });
      return null;
    } catch (e) {
      this.logger.error(e);
    }
  }

  findByUserId(user_id: string): Promise<Nullable<Array<MessageAggregate>>> {
    try {
      Logger.debug({ user_id });
      return null;
    } catch (e) {
      this.logger.error(e);
    }
  }

  findByMessageId(message_id: string): Promise<Nullable<MessageAggregate>> {
    try {
      Logger.debug({ message_id });
      return null;
    } catch (e) {
      this.logger.error(e);
    }
  }
}
