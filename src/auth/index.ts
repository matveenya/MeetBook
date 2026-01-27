import axios from 'axios';
import apiClient from '../api/client';
import { createAuth } from 'vue-auth3';
import driverAuthBasic from 'vue-auth3/dist/drivers/auth/basic';
import driverHttpAxios from 'vue-auth3/dist/drivers/http/axios';
import googleDriver from './google';
import { router } from '../router';
import type { UserData, ApiResponse } from '../types/auth';

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
axios.defaults.withCredentials = true;

export const auth = createAuth({
  plugins: { router },
  drivers: {
    auth: driverAuthBasic,
    http: driverHttpAxios,
    oauth2: {
      google: googleDriver,
    },
  },
  ...({ http: apiClient } as any), // eslint-disable-line @typescript-eslint/no-explicit-any
  cookie: {
    path: '/',
  },
  tokenDefaultName: 'accessToken',
  tokenStore: ['cookie'],

  registerData: {
    url: '/auth/register',
    method: 'POST',
    redirect: '/',
    autoLogin: true,
  },
  loginData: {
    url: '/auth/login',
    method: 'POST',
    fetchUser: true,
    redirect: '/',
  },
  logoutData: {
    url: '/auth/logout',
    method: 'POST',
    redirect: '/login',
    makeRequest: true,
  },
  fetchData: {
    url: '/auth/user',
    method: 'GET',
    enabled: true,
  },
  refreshData: { enabled: false },
  parseUserData: (res: { data: ApiResponse<UserData> }) => res.data.data,
});
