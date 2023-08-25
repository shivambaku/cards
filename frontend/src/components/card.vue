<script setup lang="ts">
defineProps({
  id: Number,
  name: String,
  suit: Number,
  trump: String,
  path: String,
});
</script>

<template>
  <div class="flex h-[112px] w-[80px] items-center justify-center">
    <img :src="`/src/assets/cards/${name}.svg`" alt="" class="max-h-full max-w-full hover:mb-10">
  </div>
</template>
