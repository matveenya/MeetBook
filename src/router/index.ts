import { createRouter, createWebHistory } from 'vue-router';
import { installAuthGuard } from '@/router/authGuard';
import { routes } from '@/router/routes';

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

installAuthGuard(router);
