import axios, { AxiosError } from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

const AUTH_ENDPOINTS_WITHOUT_REFRESH = [
  '/auth/login',
  '/auth/register',
  '/auth/logout',
  '/auth/refresh',
  '/auth/google',
];

const shouldSkipRefresh = (url?: string): boolean => {
  if (!url) {
    return false;
  }

  let pathName = url;
  try {
    pathName = new URL(url, import.meta.env.VITE_API_BASE_URL).pathname;
  } catch {
    // Keep raw URL fallback when parsing fails.
  }
  return AUTH_ENDPOINTS_WITHOUT_REFRESH.some(endpoint => pathName.endsWith(endpoint));
};

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
          `${import.meta.env.VITE_API_BASE_URL}/auth/refresh`,
          {},
          { withCredentials: true }
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
