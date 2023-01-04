import { Inject, Injectable, Logger, OnModuleDestroy } from '@nestjs/common';
import { ChatClient } from '@twurple/chat';
import { AuthService } from './auth.service';

@Injectable()
export class ChatService implements OnModuleDestroy {
  private readonly logger: Logger = new Logger(ChatService.name);
  private readonly chat: ChatClient;

  constructor(
    @Inject('CHANNELS') private readonly channels: Array<string>,
    private readonly authService: AuthService
  ) {
    this.chat = new ChatClient({
      authProvider: this.authService.AuthProvider,
      channels,
      requestMembershipEvents: true,
    });
  }

  onModuleDestroy() {
    this.disconnectChat();
  }

  connectChat(): void {
    this.chat
      .connect()
      .then(() => {
        this.logger.debug('Chat connected...');
      })
      .catch(() => {
        this.logger.error('Chat can not connect...');
      });
  }

  disconnectChat(): void {
    this.chat
      .quit()
      .then(() => {
        this.logger.debug('Chat disconnected...');
      })
      .catch(() => {
        this.logger.error('Chat can not disconnect...');
      });
  }

  get Chat(): ChatClient {
    return this.chat;
  }
}
