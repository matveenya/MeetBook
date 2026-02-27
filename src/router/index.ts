import { createRouter, createWebHistory } from 'vue-router';
import Login from '../pages/Login.vue';
import Registration from '../pages/Registration.vue';
import MeetBook from '../pages/MeetBook.vue';
import { auth } from '../auth';
import apiClient from '../api/client';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { auth: false },
  },
  {
    path: '/login/google',
    name: 'GoogleCallback',
    component: MeetBook,
    meta: { auth: false },
  },
  {
    path: '/registration',
    name: 'Registration',
    component: Registration,
    meta: { auth: false },
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('../pages/MeetBook.vue'),
    meta: { auth: true },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

const tryRestoreSession = async (): Promise<boolean> => {
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
  } catch {
    // Fall back to refresh flow when access token is expired.
  }

  try {
    await apiClient.post('/auth/refresh', {});
    await auth.fetch();
    return auth.check();
  } catch {
    return false;
  }
};

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
