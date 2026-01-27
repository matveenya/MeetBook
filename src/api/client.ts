import axios, { AxiosError } from 'axios';
import { auth } from '../auth';

const apiClient = axios.create({
  baseURL: 'http://localhost:3001',
  withCredentials: true,
});

apiClient.interceptors.response.use(
  response => response,
  (error: AxiosError) => {
    if (error.response) {
      const status = error.response.status;

      if (status === 401) {
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
