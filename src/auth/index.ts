import axios from 'axios';
import apiClient from '../api/client';
import { createAuth } from 'vue-auth3';
import driverHttpAxios from 'vue-auth3/dist/drivers/http/axios';
import googleDriver from './google';
import cookieSessionDriver from './cookieSessionDriver';
import { router } from '../router';
import type { UserData, ApiResponse } from '../types/auth';
import { AUTH_ENDPOINTS } from '../api/endpoints';

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
axios.defaults.withCredentials = true;

export const auth = createAuth({
  plugins: { router },
  authRedirect: '/login',
  forbiddenRedirect: '/',
  notFoundRedirect: '/',
  drivers: {
    auth: cookieSessionDriver,
    http: driverHttpAxios,
    oauth2: {
      google: googleDriver,
    },
  },
  ...({ http: apiClient } as any), // eslint-disable-line @typescript-eslint/no-explicit-any
  cookie: {
    path: '/',
  },

  registerData: {
    url: AUTH_ENDPOINTS.register,
    method: 'POST',
    redirect: '/',
    autoLogin: true,
  },
  loginData: {
    url: AUTH_ENDPOINTS.login,
    method: 'POST',
    fetchUser: true,
    redirect: '/',
  },
  logoutData: {
    url: AUTH_ENDPOINTS.logout,
    method: 'POST',
    redirect: '/login',
    makeRequest: true,
  },
  fetchData: {
    url: AUTH_ENDPOINTS.user,
    method: 'GET',
    enabled: true,
    waitRefresh: true,
  },
  refreshToken: {
    url: AUTH_ENDPOINTS.refresh,
    method: 'POST',
    enabled: true,
  },
  parseUserData: (res: { data: ApiResponse<UserData> }) => res.data.data,
});
