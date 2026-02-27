import apiClient from '../client';
import { AUTH_ENDPOINTS } from '../endpoints';

export const refreshSessionRequest = async () => {
  await apiClient.post(AUTH_ENDPOINTS.refresh, {});
};

export const exchangeGoogleCodeRequest = async (code: string) => {
  await apiClient.post(AUTH_ENDPOINTS.google, { code });
};
