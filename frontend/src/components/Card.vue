<script setup lang="ts">
import type { Card } from '@/composables/useCards';

defineProps<{
  card: Card
}>();
</script>

<template>
  <div class="fixed bottom-[100px] flex h-[180px] w-[120px] items-center justify-center">
    <img :src="`/src/assets/cards/${card.img}`" :alt="card.name" class="max-h-full max-w-full hover:mb-20">
  </div>
</template>
