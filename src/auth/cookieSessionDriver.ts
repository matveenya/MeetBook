import { defineAuthDriver } from 'vue-auth3';

const AUTH_SUCCESS_ENDPOINTS = [
  '/auth/login',
  '/auth/register',
  '/auth/google',
  '/auth/user',
  '/auth/refresh',
];

const SESSION_MARKER = 'cookie-session';

const resolvePathname = (url?: string): string => {
  if (!url) {
    return '';
  }

  try {
    return new URL(url, import.meta.env.VITE_API_BASE_URL).pathname;
  } catch {
    return url;
  }
};

export default defineAuthDriver({
  request(_auth, options) {
    return options;
  },
  response(_auth, rawResponse) {
    const response = rawResponse as typeof rawResponse & { config?: { url?: string } };
    const headerToken = response.headers?.authorization ?? response.headers?.Authorization;
    if (typeof headerToken === 'string' && headerToken.length > 0) {
      return headerToken;
    }

    const pathname = resolvePathname(response.config?.url);
    const isAuthSuccessResponse = AUTH_SUCCESS_ENDPOINTS.some(endpoint =>
      pathname.endsWith(endpoint)
    );

    return isAuthSuccessResponse ? SESSION_MARKER : null;
  },
});
