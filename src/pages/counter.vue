<script setup lang="ts">
import { useCounterStore } from '@/composables/useCounterStore';

const counterStore = useCounterStore();
</script>

<template>
  <div class="flex h-screen w-full flex-row flex-wrap justify-center bg-slate-800">
    <div class="m-2">
      <div class="m-1 text-white">
        Count is {{ counterStore.count }}
      </div>
      <button class="rounded-md border-2 border-slate-900  bg-slate-900 p-2 text-white" @click="counterStore.increment()">
        Increment
      </button>
    </div>
  </div>
</template>
