import instance from '../api/instance';
import type { LoginSchema, AuthSchema } from '../utils/schemas/authValidationSchema';

export const AuthService = {
  async login(credentials: LoginSchema) {
    const { data } = await instance.post('/auth/login', credentials);
    return data;
  },
  async register(userData: Omit<AuthSchema, 'confirmPassword'>) {
    const { data } = await instance.post('/auth/register', userData);
    return data;
  },
  async logout() {
    await instance.post('/auth/logout');
  },
  async getCurrentUser() {
    const { data } = await instance.get('/auth/user');
    return data;
  },
};
