import { createRouter, createWebHistory } from '@ionic/vue-router';
import Tabs from '../views/Tabs.vue';

const privateRoute = (to, from, next) => {
  const isAuthenticated = localStorage.getItem('access_token');

  if (!isAuthenticated) {
    next({ name: 'login' });
  } else {
    next();
  }
};

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Auth/Login.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/Auth/Register.vue'),
  },
  {
    path: '/',
    component: Tabs,
    beforeEnter: privateRoute,
    children: [
      {
        path: '',
        redirect: '/home',
      },
      {
        path: '/home',
        component: () => import('@/views/Home.vue'),
      },
      {
        path: '/search',
        component: () => import('@/views/Search/Search.vue'),
      },
      {
        path: '/loves',
        component: () => import('@/views/Loves/Loves.vue'),
      },
      {
        path: '/user',
        component: () => import('@/views/User/User.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  base: '/',
  routes,
});

export default router;
