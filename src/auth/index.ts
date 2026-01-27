import axios from 'axios';
import apiClient from '../api/client';
import { createAuth } from 'vue-auth3';
import driverAuthBasic from 'vue-auth3/dist/drivers/auth/basic';
import driverHttpAxios from 'vue-auth3/dist/drivers/http/axios';
import googleDriver from './google';
import { router } from '../router';

axios.defaults.baseURL = 'http://localhost:3001';
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
  http: apiClient,
  cookie: {
    name: 'token',
  },
  tokenDefaultName: 'token',
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
  parseUserData: (res: any) => res.data, // eslint-disable-line @typescript-eslint/no-explicit-any
} as any); // eslint-disable-line @typescript-eslint/no-explicit-any
