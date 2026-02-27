import { createRouter, createWebHistory } from 'vue-router';
import { installAuthGuard } from './authGuard';
import { routes } from './routes';

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

installAuthGuard(router);
