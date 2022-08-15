import {
  createRouter,
  createWebHistory,
} from 'vue-router';
import { createApp } from 'vue';
import { createPinia } from 'pinia';

import '@/style.css';
import App from '@/App.vue';
import routes from '@/router/routes';

const app = createApp(App);
const router = createRouter({
  history: createWebHistory(),
  routes,
});
const store = createPinia();

app.use(router);
app.use(store);

app.mount('#app');
