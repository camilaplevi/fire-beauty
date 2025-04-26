import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/inicio', component: () => import('pages/dashboard-home/DashboardHome.vue') },
      { path: '/planos', component: () => import('pages/planos/InfoPlanos.vue') },
      { path: '/sobre', component: () => import('pages/sobre/InfoSobre.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
