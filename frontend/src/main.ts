// import 'virtual:uno.css';
// import '@unocss/reset/tailwind.css';
import '@/assets/style.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { VueQueryPlugin, type VueQueryPluginOptions } from '@tanstack/vue-query';
import {
  createRouter,
  createWebHistory,
} from 'vue-router/auto';

import axios from 'axios';
import App from './App.vue';

const router = createRouter({
  history: createWebHistory(),
});

async function defaultQueryFn({ queryKey }: { queryKey: any }) {
  const { data } = await axios.get(
    queryKey,
  );
  return data;
};

const vueQueryPluginOptions: VueQueryPluginOptions = {
  queryClientConfig: {
    defaultOptions: { queries: { queryFn: defaultQueryFn } },
  },
};

const app = createApp(App);

app.use(createPinia());
app.use(VueQueryPlugin, vueQueryPluginOptions);
app.use(router);

app.mount('#app');
