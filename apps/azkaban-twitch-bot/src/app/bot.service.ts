import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { AppService } from './app.service';
import { ChatClient } from '@twurple/chat';

@Injectable()
export class BotService implements OnModuleInit {
  private readonly logger: Logger = new Logger(BotService.name);
  private readonly chat: ChatClient;

  constructor(private readonly service: AppService) {
    this.chat = this.service.getChatClient();
  }

  onModuleInit(): void {
    this.chat.onJoin((channel: string, username: string) => {
      this.logger.debug({ type: 'join', channel, username });
    });
    this.chat.onPart((channel: string, username: string) => {
      this.logger.debug({ type: 'part', channel, username });
    });
    this.chat.onMessage(
      (channel: string, username: string, message: string) => {
        this.logger.debug({ type: 'message', channel, username, message });
      }
    );
  }
}
