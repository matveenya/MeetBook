import { defineStore } from 'pinia';
import { auth } from '../auth';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as any, // eslint-disable-line @typescript-eslint/no-explicit-any
    isReady: false,
  }),

  actions: {
    syncUser() {
      this.user = auth.user();
    },

    setReady() {
      this.isReady = true;
    },
  },
});
