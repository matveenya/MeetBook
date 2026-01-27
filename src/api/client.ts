import axios, { AxiosError } from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

apiClient.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    if (error.response) {
      const status = error.response.status;

      if (status === 401) {
        const { auth } = await import('../auth');
        auth.logout({ redirect: '/login' });
      }

      if (status === 403) {
        return Promise.reject(new Error('Access denied: insufficient rights.'));
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
