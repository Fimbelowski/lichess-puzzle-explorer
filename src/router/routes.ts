import { RouteRecordRaw } from 'vue-router';

import HelloWorld from '@/components/HelloWorld.vue';
import WarningView from '@/views/WarningView.vue';

const routes: RouteRecordRaw[] = [
  {
    beforeEnter: (to, from, next) => {
      console.log('No "puzzles.csv" found. Redirecting...');
      next('/warning');
    },
    component: HelloWorld,
    props: {
      msg: 'Vite + Vue',
    },
    path: '/',
  },
  {
    component: WarningView,
    path: '/warning',
  },
];

export default routes;
