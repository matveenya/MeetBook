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
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, _from, next) => {
  await auth.ready();

  const isAuthenticated = auth.check();

  if (to.meta.auth === true && !isAuthenticated) {
    next({ name: 'Login' });
  } else if (to.meta.auth === false && isAuthenticated) {
    next({ name: 'Home' });
  } else {
    next();
  }
});
