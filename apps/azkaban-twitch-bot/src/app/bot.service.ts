import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { AppService } from './app.service';
import { ChatClient } from '@twurple/chat';
import { TwitchPrivateMessage } from '@twurple/chat/lib/commands/TwitchPrivateMessage';

@Injectable()
export class BotService implements OnModuleInit {
  private readonly logger: Logger = new Logger(BotService.name);
  private readonly chat: ChatClient;

  constructor(private readonly service: AppService) {
    this.chat = this.service.getChatClient();
  }

  onModuleInit(): void {
    this.chat.onJoin((channel: string, username: string) => {
      this.onJoin(channel, username);
    });
    this.chat.onPart((channel: string, username: string) => {
      this.onPart(channel, username);
    });
    this.chat.onMessage(
      (
        channel: string,
        username: string,
        message: string,
        msg: TwitchPrivateMessage
      ) => {
        this.onMessage(channel, username, message, msg.id, msg.userInfo.color);
      }
    );
  }

  private onJoin(channel: string, username: string): void {
    this.logger.debug({ type: 'join', channel, username, date: new Date() });
  }

  private onPart(channel: string, username: string): void {
    this.logger.debug({ type: 'part', channel, username, date: new Date() });
  }

  private onMessage(
    channel: string,
    username: string,
    message: string,
    messageId: string,
    color: string
  ): void {
    this.logger.debug({
      type: 'message',
      channel,
      username,
      message,
      messageId,
      color,
      date: new Date(),
    });
  }
}
