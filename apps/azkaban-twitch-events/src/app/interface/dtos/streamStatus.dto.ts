export interface StreamOnlineDto {
  id: string;
  channelId: string;
  type: string;
  date: Date;
  title: string;
  thumbnail: string;
}

export interface StreamOfflineDto {
  broadcasterId: string;
  broadcasterType: string;
  displayName: string;
  type: string;
}
