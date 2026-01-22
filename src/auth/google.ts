import { defineOAuth2Driver } from 'vue-auth3';

export default defineOAuth2Driver({
  url: 'https://accounts.google.com/o/oauth2/auth',

  params: {
    client_id: import.meta.env.VITE_CLIENT_ID,
    redirect_uri: 'http://localhost:5173/login/google',
    response_type: 'code',
    scope: 'openid email profile',
    state: {},
  },
});
