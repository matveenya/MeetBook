import { createAuth } from 'vue-auth3';
import driverAuthBasic from 'vue-auth3/dist/drivers/auth/basic';
import driverHttpAxios from 'vue-auth3/dist/drivers/http/axios';
import googleDriver from './google';
import { router } from '../router';

export const auth = createAuth({
  plugins: {
    router: router,
  },
  drivers: {
    auth: driverAuthBasic,
    http: driverHttpAxios,
    oauth2: {
      google: googleDriver,
    },
  },
  loginData: { url: 'auth/login', method: 'POST', redirect: '/', fetchUser: true },
  registerData: { url: 'auth/register', method: 'POST', redirect: '/' },
  authRedirect: { path: '/login' },
  notFoundRedirect: { path: '/' },
});
