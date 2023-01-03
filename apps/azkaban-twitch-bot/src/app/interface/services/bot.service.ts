import { Injectable, Logger } from '@nestjs/common';
import { ChatService } from '@azkaban/shared';
import { TwitchPrivateMessage } from '@twurple/chat/lib/commands/TwitchPrivateMessage';
import { EventEmitter2 } from '@nestjs/event-emitter';
import {
  ChatCommunitySubInfo,
  ChatRaidInfo,
  ChatSubGiftInfo,
  ChatSubGiftUpgradeInfo,
  ChatSubInfo,
  ClearChat,
  UserNotice,
} from '@twurple/chat';

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
    this.onJoin();
    this.onPart();
    this.onMessage();
    this.onAction();
    this.onBan();
    this.onClearChat();
    this.onConnect();
    this.onDisconnect();
    this.onGiftPaidUpgrade();
    this.onRaid();
    this.onResub();
    this.onSubGift();
    this.onCommunitySub();
    this.onSub();
    this.onTimeout();
  }

  private onJoin(): void {
    this.chatService.Chat.onJoin((channel: string, username: string) =>
      this.eventEmitter.emit('chatJoinEvent', { channel, username })
    );
  }
  private onPart(): void {
    this.chatService.Chat.onPart((channel: string, username: string) =>
      this.eventEmitter.emit('chatPartEvent', { channel, username })
    );
  }
  private onMessage(): void {
    this.chatService.Chat.onMessage(
      (
        channel: string,
        username: string,
        message: string,
        msg: TwitchPrivateMessage
      ) =>
        this.eventEmitter.emit('chatMessageEvent', {
          channel,
          username,
          message,
          msg,
        })
    );
  }
  private onAction(): void {
    this.chatService.Chat.onAction(
      (
        channel: string,
        username: string,
        message: string,
        msg: TwitchPrivateMessage
      ) => {
        this.eventEmitter.emit('chatActionEvent', {
          channel,
          username,
          message,
          msg,
        });
      }
    );
  }
  private onBan(): void {
    this.chatService.Chat.onBan(
      (channel: string, username: string, msg: ClearChat) => {
        this.eventEmitter.emit('chatBanEvent', {
          channel,
          username,
          msg,
        });
      }
    );
  }
  private onClearChat(): void {
    this.chatService.Chat.onChatClear((channel: string, msg: ClearChat) => {
      this.eventEmitter.emit('chatClearEvent', {
        channel,
        msg,
      });
    });
  }
  private onConnect(): void {
    this.chatService.Chat.onConnect(() => {
      this.eventEmitter.emit('chatConnectEvent', {});
    });
  }
  private onDisconnect(): void {
    this.chatService.Chat.onDisconnect((manually: boolean, reason: Error) => {
      this.eventEmitter.emit('chatDisconnectEvent', { manually, reason });
    });
  }
  private onGiftPaidUpgrade(): void {
    this.chatService.Chat.onGiftPaidUpgrade(
      (
        channel: string,
        username: string,
        subInfo: ChatSubGiftUpgradeInfo,
        msg: UserNotice
      ) => {
        this.eventEmitter.emit('chatGiftPaidUpgradeEvent', {
          channel,
          username,
          subInfo,
          msg,
        });
      }
    );
  }
  private onRaid(): void {
    this.chatService.Chat.onRaid(
      (
        channel: string,
        username: string,
        raidInfo: ChatRaidInfo,
        msg: UserNotice
      ) => {
        this.eventEmitter.emit('chatRaidEvent', {
          channel,
          username,
          raidInfo,
          msg,
        });
      }
    );
  }

  private onResub(): void {
    this.chatService.Chat.onResub(
      (
        channel: string,
        username: string,
        subInfo: ChatSubInfo,
        msg: UserNotice
      ) => {
        this.eventEmitter.emit('chatResubEvent', {
          channel,
          username,
          subInfo,
          msg,
        });
      }
    );
  }

  private onSubGift(): void {
    this.chatService.Chat.onSubGift(
      (
        channel: string,
        username: string,
        subInfo: ChatSubGiftInfo,
        msg: UserNotice
      ) => {
        this.eventEmitter.emit('chatSubGiftEvent', {
          channel,
          username,
          subInfo,
          msg,
        });
      }
    );
  }

  private onCommunitySub(): void {
    this.chatService.Chat.onCommunitySub(
      (
        channel: string,
        username: string,
        subInfo: ChatCommunitySubInfo,
        msg: UserNotice
      ) => {
        this.eventEmitter.emit('chatCommunitySubEvent', {
          channel,
          username,
          subInfo,
          msg,
        });
      }
    );
  }

  private onSub(): void {
    this.chatService.Chat.onSub(
      (
        channel: string,
        username: string,
        subInfo: ChatSubInfo,
        msg: UserNotice
      ) => {
        this.eventEmitter.emit('chatSubEvent', {
          channel,
          username,
          subInfo,
          msg,
        });
      }
    );
  }

  private onTimeout(): void {
    this.chatService.Chat.onTimeout(
      (channel: string, username: string, duration: number, msg: ClearChat) => {
        this.eventEmitter.emit('chatTimeoutEvent', {
          channel,
          username,
          duration,
          msg,
        });
      }
    );
  }
}
