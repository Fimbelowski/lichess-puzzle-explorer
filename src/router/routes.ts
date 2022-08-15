import { RouteRecordRaw } from 'vue-router';

import HelloWorld from '@/components/HelloWorld.vue';
import WarningView from '@/views/WarningView.vue';

const routes: RouteRecordRaw[] = [
  {
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
