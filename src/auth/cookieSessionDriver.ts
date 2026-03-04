import { defineAuthDriver } from 'vue-auth3';
import { AUTH_SUCCESS_ENDPOINTS } from '@/api/endpoints';
import { resolvePathname } from '@/api/url';

const SESSION_MARKER = 'cookie-session';

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
