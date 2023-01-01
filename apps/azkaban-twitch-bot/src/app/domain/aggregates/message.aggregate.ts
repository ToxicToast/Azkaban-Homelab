import { AggregateRoot } from '@nestjs/cqrs';
import { Domain, Nullable } from '@azkaban/shared';
import { MessageModel } from '../models';
import { Logger } from '@nestjs/common';

export class MessageAggregate
  extends AggregateRoot
  implements Domain<MessageModel>
{
  constructor(
    private readonly id: string,
    private readonly channel_id: string,
    private readonly user_id: string,
    private readonly message_id: string,
    private readonly channel: string,
    private readonly username: string,
    private readonly message: string,
    private readonly message_color: string,
    private active: boolean,
    private readonly created_at: Date,
    private updated_at: Nullable<Date>,
    private deleted_at: Nullable<Date>
  ) {
    super();
  }

  isUpdated(): boolean {
    return !!this.updated_at;
  }

  isDeleted(): boolean {
    return !!this.deleted_at;
  }

  isActive(): boolean {
    return this.active && !this.isDeleted();
  }

  toAnemic(): MessageModel {
    return {
      id: this.id,
      channel_id: this.channel_id,
      user_id: this.user_id,
      message_id: this.message_id,
      channel: this.channel,
      username: this.username,
      message: this.message,
      message_color: this.message_color,
      active: this.active,
      created_at: this.created_at,
      updated_at: this.updated_at,
      deleted_at: this.deleted_at,
      isActive: this.isActive(),
      isUpdated: this.isUpdated(),
      isDeleted: this.isDeleted(),
    };
  }

  create(): void {
    Logger.debug(this.toAnemic(), MessageAggregate.name);
  }

  activate(): void {
    this.active = true;
    this.updated_at = new Date();
  }

  deactivate(): void {
    this.active = false;
    this.updated_at = new Date();
  }

  delete(): void {
    this.deleted_at = new Date();
  }

  restore(): void {
    this.deleted_at = null;
  }
}
