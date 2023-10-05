<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<template>
  <nav class="border-gray-800 bg-gray-800 dark:bg-gray-800 ">
    <div class="fixed top-0 z-50  h-[40px] w-full border-gray-200 bg-white dark:border-gray-600 dark:bg-gray-700">
      <div class="mx-auto grid h-full  grid-cols-1">
        <!-- Home -->
        <router-link to="/" data-tooltip-target="tooltip-home" class="group relative inline-flex flex-col items-center justify-center  px-5 hover:bg-gray-50 dark:hover:bg-gray-800">
          <span>Home</span>
        </router-link>
      </div>
    </div>
  </nav>
  <RouterView />
</template>
