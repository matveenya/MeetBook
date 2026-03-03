import apiClient from '@/api/client';
import { getAgoraTokenEndpoint } from '@/api/endpoints';

export interface AgoraTokenPayload {
  appId: string;
  token: string;
  uid: number | string;
}

export const fetchAgoraTokenRequest = async (channelName: string): Promise<AgoraTokenPayload> => {
  const { data } = await apiClient.get<AgoraTokenPayload>(getAgoraTokenEndpoint(channelName));
  return data;
};
