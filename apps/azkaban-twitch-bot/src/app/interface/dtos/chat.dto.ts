import {
  ChatCommunitySubInfo,
  ChatRaidInfo,
  ChatSubGiftUpgradeInfo,
  ClearChat,
  UserNotice,
} from '@twurple/chat';

export interface ChatClearEventDto {
  channel: string;
  msg: ClearChat;
}

export interface DisconnectEventDto {
  manually: boolean;
  reason: Error;
}

export interface GiftPaidUpgradeEventDto {
  channel: string;
  username: string;
  subInfo: ChatSubGiftUpgradeInfo;
  msg: UserNotice;
}

export interface RaidEventDto {
  channel: string;
  username: string;
  raidInfo: ChatRaidInfo;
  msg: UserNotice;
}

export interface CommunitySubEventDto {
  channel: string;
  username: string;
  subInfo: ChatCommunitySubInfo;
  msg: UserNotice;
}
