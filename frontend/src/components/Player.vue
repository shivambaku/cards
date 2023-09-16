<script setup lang="ts">
import { Icon } from '@iconify/vue';
import type { JudgementPlayer, JudgementRoundCall } from '@/composables/useJudgementGame';

defineProps<{
  player: JudgementPlayer
  call: JudgementRoundCall
  turn: string
}>();
</script>

<template>
  <div class="bottom-20 z-10 h-[150px] w-[80px] flex-row items-center justify-center text-xs text-white">
    <p class=" absolute  left-[28%] top-[55%] text-center ">
      [ {{ call.tricks }} / {{ call.call }} ]
    </p>
    <p class="mb-1 text-center">
      {{ player.name }}
    </p>
    <Icon
      icon="fa-solid:user" class=" text-[90px] text-black " :class="turn"
    />
  </div>
</template>
