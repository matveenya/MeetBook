import apiClient from '@/api/client';
import { AUTH_ENDPOINTS } from '@/api/endpoints';

export const refreshSessionRequest = async () => {
  await apiClient.post(AUTH_ENDPOINTS.refresh, {});
};

export const exchangeGoogleCodeRequest = async (code: string) => {
  await apiClient.post(AUTH_ENDPOINTS.google, { code });
};
