<script setup lang="ts">
import GameModeCard from '@/components/GameModeCard.vue';
</script>

<template>
  <div class="h-screen w-screen  bg-gray-800">
    <div class="flex h-screen items-center justify-center">
      <GameModeCard :id="3" class="origin-bottom -rotate-12" title="3 Player" :players-count="30" :rooms-count="23" />
      <GameModeCard :id="4" class="-translate-y-6" title="4 Player" :players-count="43" :rooms-count="12" />
      <GameModeCard :id="5" class="origin-bottom rotate-12" title="5 Player" :players-count="45" :rooms-count="33" />
    </div>
  </div>
</template>
