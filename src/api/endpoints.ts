export const AUTH_ENDPOINTS = {
  login: '/auth/login',
  register: '/auth/register',
  logout: '/auth/logout',
  refresh: '/auth/refresh',
  google: '/auth/google',
  user: '/auth/user',
} as const;

export const API_ENDPOINTS = {
  meetings: '/api/meetings',
  users: '/api/users',
  agoraToken: '/api/agora/token',
} as const;

export const getMeetingEndpoint = (meetingId: string): string =>
  `${API_ENDPOINTS.meetings}/${meetingId}`;

export const getAgoraTokenEndpoint = (channelName: string): string =>
  `${API_ENDPOINTS.agoraToken}?channelName=${encodeURIComponent(channelName)}`;

export const AUTH_ENDPOINTS_WITHOUT_REFRESH = [
  AUTH_ENDPOINTS.login,
  AUTH_ENDPOINTS.register,
  AUTH_ENDPOINTS.logout,
  AUTH_ENDPOINTS.refresh,
  AUTH_ENDPOINTS.google,
] as const;

export const AUTH_SUCCESS_ENDPOINTS = [
  AUTH_ENDPOINTS.login,
  AUTH_ENDPOINTS.register,
  AUTH_ENDPOINTS.google,
  AUTH_ENDPOINTS.user,
  AUTH_ENDPOINTS.refresh,
] as const;
