<script setup lang="ts">
import GameModeCard from '@/components/GameModeCard.vue';
</script>

<template>
  <div class="h-screen w-screen">
    <div class="flex h-screen flex-col">
      <div class="flex h-1/4">
        <div class="m-auto text-center text-4xl text-white">
          <div>
            Welcome
          </div>
          <div>
            Choose your Mode
          </div>
        </div>
      </div>
      <div class="h-1/2">
        <div class="flex h-full items-center justify-center">
          <GameModeCard :id="3" class="origin-bottom -rotate-12" title="3 Player" :players-count="30" :rooms-count="23" />
          <GameModeCard :id="4" class="-translate-y-6" title="4 Player" :players-count="43" :rooms-count="12" />
          <GameModeCard :id="5" class="origin-bottom rotate-12" title="5 Player" :players-count="45" :rooms-count="33" />
        </div>
      </div>
    </div>
  </div>
</template>
