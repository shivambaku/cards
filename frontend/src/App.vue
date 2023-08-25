<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<template>
  <nav class="border-gray-800 bg-gray-800 dark:bg-gray-800 ">
    <div class="fixed bottom-4 left-1/2 z-50 h-16 w-full max-w-lg -translate-x-1/2 rounded-full border border-gray-200 bg-white dark:border-gray-600 dark:bg-gray-700">
      <div class="mx-auto grid h-full max-w-lg grid-cols-3">
        <!-- Home -->
        <router-link to="/" data-tooltip-target="tooltip-home" class="group relative inline-flex flex-col items-center justify-center rounded-l-full px-5 hover:bg-gray-50 dark:hover:bg-gray-800">
          <svg class="mb-1 h-5 w-5 text-gray-500 group-hover:text-blue-600 dark:text-gray-400 dark:group-hover:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
          </svg>
          <span class="sr-only">Home</span>
        </router-link>
        <div id="tooltip-home" role="tooltip" class="invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700">
          Home
        </div>
        <!-- Counter -->
        <div class="flex items-center justify-center">
          <router-link to="/counter" data-tooltip-target="tooltip-new" class="group relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-medium hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800">
            <svg class="h-4 w-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
            </svg>
            <span class="sr-only">Counter</span>
          </router-link>
        </div>
        <div id="tooltip-new" role="tooltip" class="invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700">
          Counter
        </div>
        <!-- Characters -->
        <router-link to="/characters" data-tooltip-target="tooltip-home" class="group inline-flex flex-col items-center justify-center rounded-r-full px-5 hover:bg-gray-50 dark:hover:bg-gray-800">
          <svg class="mb-1 h-5 w-5 text-gray-500 group-hover:text-blue-600 dark:text-gray-400 dark:group-hover:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
          </svg>
          <span class="sr-only">Characters</span>
        </router-link>
        <div id="tooltip-profile" role="tooltip" class="invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700">
          Characters
        </div>
      </div>
    </div>
  </nav>
  <RouterView />
</template>
