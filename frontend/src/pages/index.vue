<script setup lang="ts">
import GameModeCard from '@/components/GameModeCard.vue';
</script>

<template>
  <div class="flex h-screen w-screen flex-col">
    <div class="flex basis-4/12 items-center justify-center text-center text-4xl text-white">
      <div>
        <div>Welcome</div>
        <div>Choose your Mode</div>
      </div>
    </div>
    <div class="mx-20 mb-20 flex basis-8/12 items-center justify-evenly text-center">
      <GameModeCard :id="3" class="origin-bottom -rotate-12" title="3 Player" :players-count="30" :rooms-count="23" />
      <GameModeCard :id="4" class="-translate-y-6" title="4 Player" :players-count="43" :rooms-count="12" />
      <GameModeCard :id="5" class="origin-bottom rotate-12" title="5 Player" :players-count="45" :rooms-count="33" />
    </div>
  </div>
</template>
