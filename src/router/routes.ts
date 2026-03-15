import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  // Rota principal do cliente — acesso via link
  {
    path: '/pedido/:linkId',
    component: () => import('pages/CustomerPage.vue'),
  },

  // Redireciona root para /pedido/demo para facilitar testes
  {
    path: '/',
    redirect: '/pedido/demo',
  },

  // Always leave this as last one
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
