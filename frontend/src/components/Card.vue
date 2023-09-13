<script setup lang="ts">
import type { Card } from '@/composables/useCards';

defineProps<{
  card: Card
  player: string
}>();
</script>

<template>
  <div class="fixed flex h-[180px] w-[120px] items-center justify-center">
    <img v-if="player === 'main'" :src="`/src/assets/cards/${card.img}`" :alt="card.name" class="max-h-full max-w-full hover:-translate-y-10">
    <img v-if="player === 'other'" src="/src/assets/cards/back.svg" :alt="card.name" class="max-h-full max-w-full border-[1px] border-black">
  </div>
</template>
