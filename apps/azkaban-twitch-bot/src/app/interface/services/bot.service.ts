import { Injectable, Logger } from '@nestjs/common';
import { ChatService } from '@azkaban/shared';
import { TwitchPrivateMessage } from '@twurple/chat/lib/commands/TwitchPrivateMessage';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class BotService {
  private readonly logger: Logger = new Logger(BotService.name);

  constructor(
    private readonly chatService: ChatService,
    private readonly eventEmitter: EventEmitter2
  ) {
    this.chatService.connectChat();
    this.chatEvents();
  }

  private chatEvents(): void {
    this.logger.log('Subscribe to Chat...');
    this.chatService.Chat.onJoin((channel: string, username: string) =>
      this.eventEmitter.emit('chatJoinEvent', { channel, username })
    );
    this.chatService.Chat.onPart((channel: string, username: string) =>
      this.eventEmitter.emit('chatPartEvent', { channel, username })
    );
    this.chatService.Chat.onMessage(
      (
        channel: string,
        username: string,
        message: string,
        msg: TwitchPrivateMessage
      ) =>
        this.logger.debug({
          type: 'message',
          channel,
          username,
          message,
          msg,
        })
    );
  }
}