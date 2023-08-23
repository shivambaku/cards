// import 'virtual:uno.css';
// import '@unocss/reset/tailwind.css';
import '@/assets/style.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { VueQueryPlugin } from '@tanstack/vue-query';
import {
  createRouter,
  createWebHistory,
} from 'vue-router/auto';

import App from './App.vue';

const router = createRouter({
  history: createWebHistory(),
});

const app = createApp(App);

app.use(createPinia());
app.use(VueQueryPlugin);
app.use(router);

app.mount('#app');
