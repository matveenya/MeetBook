import apiClient from '../api/client';
import type { LoginSchema, AuthSchema } from '../utils/schemas/authValidationSchema';

export const authService = {
  login(data: LoginSchema) {
    return apiClient.post('/auth/login', data);
  },

  register(data: AuthSchema) {
    const { ...registerData } = data;
    return apiClient.post('/auth/register', registerData);
  },

  logout() {
    return apiClient.post('/auth/logout');
  },

  fetchUser() {
    return apiClient.get('/auth/user');
  },
};
