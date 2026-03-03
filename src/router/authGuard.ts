import type { Router } from 'vue-router';
import { auth } from '@/auth';
import { refreshSessionRequest } from '@/api/modules/auth';

const tryRestoreSession = async () => {
  if (auth.check()) {
    return true;
  }

  if (!auth.token()) {
    return false;
  }

  try {
    await auth.fetch();
    if (auth.check()) {
      return true;
    }
  } catch (error) {
    void error;
  }

  try {
    await refreshSessionRequest();
    await auth.fetch();
    return auth.check();
  } catch {
    return false;
  }
};

export const installAuthGuard = (router: Router) => {
  router.beforeEach(async (to, _, next) => {
    const requiresAuth = to.meta.auth === true;
    const isGuestOnly = to.meta.auth === false;

    let isAuthenticated = auth.check();
    if (!isAuthenticated && (requiresAuth || isGuestOnly)) {
      isAuthenticated = await tryRestoreSession();
    }

    if (requiresAuth && !isAuthenticated) {
      next({ name: 'Login' });
      return;
    }

    if (isGuestOnly && isAuthenticated) {
      next({ name: 'Home' });
      return;
    }

    next();
  });
};
