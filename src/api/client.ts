import axios, { AxiosError } from 'axios';
import { AUTH_ENDPOINTS, AUTH_ENDPOINTS_WITHOUT_REFRESH } from './endpoints';
import { urlMatchesAnyPath } from './url';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

const shouldSkipRefresh = (url?: string): boolean =>
  urlMatchesAnyPath(url, AUTH_ENDPOINTS_WITHOUT_REFRESH);

apiClient.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as any; // eslint-disable-line @typescript-eslint/no-explicit-any

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !shouldSkipRefresh(originalRequest.url)
    ) {
      originalRequest._retry = true;

      try {
        await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}${AUTH_ENDPOINTS.refresh}`,
          {},
          {
            withCredentials: true,
          }
        );

        return apiClient(originalRequest);
      } catch (refreshError) {
        const { auth } = await import('../auth');
        await auth.logout({ redirect: '/login', makeRequest: false });
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
