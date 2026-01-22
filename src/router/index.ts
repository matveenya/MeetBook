import { createRouter, createWebHistory } from 'vue-router';
import Login from '../pages/Login.vue';
import Registration from '../pages/Registration.vue';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
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
    component: () => import('../App.vue'),
    meta: { auth: true },
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
