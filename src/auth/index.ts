import axios from 'axios';
import { createAuth } from 'vue-auth3';
import driverAuthBasic from 'vue-auth3/dist/drivers/auth/basic';
import driverHttpAxios from 'vue-auth3/dist/drivers/http/axios';
import { router } from '../router';
import googleDriver from './google';

axios.defaults.baseURL = 'http://localhost:3001';
axios.defaults.withCredentials = true;

export const auth = createAuth({
  plugins: {
    router,
  },
  drivers: {
    auth: driverAuthBasic,
    http: driverHttpAxios,
    oauth2: { google: googleDriver },
  },
  loginData: {
    url: '/auth/login',
    method: 'POST',
    fetchUser: true,
    redirect: '/',
  },
  registerData: {
    url: '/auth/register',
    method: 'POST',
    redirect: '/',
  },
  fetchData: {
    url: '/auth/user',
    method: 'GET',
    enabled: true,
  },
  authRedirect: { path: '/login' },
  notFoundRedirect: { path: '/' },
});
