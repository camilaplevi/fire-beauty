import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/inicio', component: () => import('pages/dashboard-home/DashboardHome.vue') },
      { path: '/blog', component: () => import('pages/blog/BlogPage.vue') },
      { path: '/planos', component: () => import('pages/planos/InfoPlanos.vue') },
      { path: '/sobre', component: () => import('pages/sobre/InfoSobre.vue') },
      {
        path: '/funcionalidades',
        component: () => import('pages/funcionalidades/InfoFuncionalidades.vue'),
      },
      { path: '/privacidade', component: () => import('pages/privacy-policy/PrivacyPolicy.vue') },
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
