<script setup lang="ts">
const props = defineProps<{
  id: number
  name: string
  score: number
  bid: number
  tricks: number
}>();
</script>

<template>
  <div class="bottom-20 h-[150px] w-[80px] flex-row items-center justify-center text-xs text-white">
    <p class=" text-center">
      Total - {{ props.score }}
    </p>

    <p class=" text-center">
      [{{ props.tricks }} / {{ props.bid }}]
    </p>
    <p class=" text-center">
      {{ props.name }}
    </p>
    <img src="/src/assets/player.svg" alt="" class=" max-h-full max-w-full">
  </div>
</template>
