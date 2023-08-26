<script setup lang="ts">
const props = defineProps<{
  id: number
  name: string
  score: number
  bid: { call: number; get: number }
  gameid: string
}>();
</script>

<template>
  <div class="flex h-[180px] w-[120px] items-center justify-center">
    <img :src="`/src/assets/cards/${props.name}.svg`" alt="" class="max-h-full max-w-full  hover:mb-20">
  </div>
</template>
