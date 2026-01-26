import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3001',
  withCredentials: true,
});

instance.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      console.error('Session expired or access denied');
    }
    return Promise.reject(error);
  }
);

export default instance;
