import { ref } from 'vue';
import { useAuth } from 'vue-auth3';
import { useRoute, useRouter } from 'vue-router';
import apiClient from '../api/client';

export function useGoogleAuth() {
  const auth = useAuth();
  const route = useRoute();
  const router = useRouter();
  const isReady = ref(false);

  const initAuth = async () => {
    const code = route.query.code;

    try {
      if (code) {
        await apiClient.post('/auth/google', { code });
        await router.replace({ query: {} });
        await auth.fetch();
      } else {
        await auth.ready();
      }
    } catch (error) {
      console.error('Auth initialization failed:', error);
      auth.logout({ redirect: '/login' });
    } finally {
      isReady.value = true;
    }
  };

  return {
    isReady,
    initAuth,
  };
}
