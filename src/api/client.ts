import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios';
import { AUTH_ENDPOINTS, AUTH_ENDPOINTS_WITHOUT_REFRESH } from './endpoints';
import { urlMatchesAnyPath } from './url';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

const shouldSkipRefresh = (url?: string): boolean =>
  urlMatchesAnyPath(url, AUTH_ENDPOINTS_WITHOUT_REFRESH);

interface RetriableRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

let refreshPromise: Promise<void> | null = null;
let isLoggingOut = false;

apiClient.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetriableRequestConfig | undefined;

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !shouldSkipRefresh(originalRequest.url)
    ) {
      originalRequest._retry = true;

      try {
        if (!refreshPromise) {
          refreshPromise = axios
            .post(
              `${import.meta.env.VITE_API_BASE_URL}${AUTH_ENDPOINTS.refresh}`,
              {},
              { withCredentials: true }
            )
            .then(() => {})
            .finally(() => {
              refreshPromise = null;
            });
        }
        await refreshPromise;
        return apiClient(originalRequest);
      } catch (refreshError) {
        if (!isLoggingOut) {
          isLoggingOut = true;
          const { auth } = await import('../auth');
          await auth.logout({ redirect: '/login', makeRequest: false });
          isLoggingOut = false;
        }
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
