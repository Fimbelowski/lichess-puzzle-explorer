import { RouteRecordRaw } from 'vue-router';

import HelloWorld from '@/components/HelloWorld.vue';

const routes: RouteRecordRaw[] = [
  {
    component: HelloWorld,
    props: {
      msg: 'Vite + Vue',
    },
    path: '/',
  },
];

export default routes;
