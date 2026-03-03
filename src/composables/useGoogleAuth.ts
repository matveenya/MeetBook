import { ref } from 'vue';
import { useAuth } from 'vue-auth3';
import { useRoute, useRouter } from 'vue-router';
import { exchangeGoogleCodeRequest } from '@/api/modules/auth';

export function useGoogleAuth() {
  const auth = useAuth();
  const route = useRoute();
  const router = useRouter();
  const isReady = ref(false);

  const initAuth = async () => {
    const rawCode = route.query.code;
    const code = Array.isArray(rawCode) ? rawCode[0] : rawCode;

    try {
      if (code) {
        await exchangeGoogleCodeRequest(code);
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
