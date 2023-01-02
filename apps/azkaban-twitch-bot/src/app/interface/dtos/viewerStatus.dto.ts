import {
  ChatSubGiftInfo,
  ChatSubInfo,
  ClearChat,
  UserNotice,
} from '@twurple/chat';

export interface JoinEventDto {
  channel: string;
  username: string;
}

export interface PartEventDto {
  channel: string;
  username: string;
}

export interface BanEventDto {
  channel: string;
  username: string;
  msg: ClearChat;
}

export interface ResubEventDto {
  channel: string;
  username: string;
  subInfo: ChatSubInfo;
  msg: UserNotice;
}

export interface SubGiftEventDto {
  channel: string;
  username: string;
  subInfo: ChatSubGiftInfo;
  msg: UserNotice;
}

export interface SubEventDto {
  channel: string;
  username: string;
  subInfo: ChatSubInfo;
  msg: UserNotice;
}

export interface TimeoutEventDto {
  channel: string;
  username: string;
  duration: number;
  msg: ClearChat;
}
