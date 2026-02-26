import { createRouter, createWebHistory } from 'vue-router';
import Login from '../pages/Login.vue';
import Registration from '../pages/Registration.vue';
import MeetBook from '../pages/MeetBook.vue';
import { auth } from '../auth';

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

router.beforeEach(async (to, _from, next) => {
  const requiresAuth = to.meta.auth === true;
  const isGuestOnly = to.meta.auth === false;

  if (requiresAuth && !auth.check()) {
    try {
      await auth.fetch();
    } catch {
      // Ignore here; protected-route redirect is handled below.
    }
  }

  const isAuthenticated = auth.check();

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
