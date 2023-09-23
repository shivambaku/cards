<script setup lang="ts">
import { ref } from 'vue';
import type { Card } from '@/composables/useCards';

const props = defineProps<{
  card: Card
  player: string
}>();

const emit = defineEmits<{
  cardMouseDown: [Card, MouseEvent, HTMLElement]
}>();

const cardRef = ref<HTMLElement | null>(null);

function mouseDown(mouseEvent: MouseEvent) {
  emit('cardMouseDown', props.card, mouseEvent, cardRef.value!);
}

defineExpose({
  cardRef,
});
</script>

<template>
  <div
    ref="cardRef"
    class="fixed flex h-[180px] w-[120px] items-center justify-center"
    @mousedown="mouseDown"
  >
    <img
      v-if="player === 'main'"
      :src="`/src/assets/cards/${card.img}`"
      :alt="card.name"
      class="max-h-full max-w-full hover:-translate-y-10"
      draggable="false"
    >
    <img
      v-if="player === 'other'"
      src="/src/assets/cards/back.svg"
      :alt="card.name"
      class="max-h-full max-w-full border-[1px] border-black"
      draggable="false"
    >
    <img
      v-if="player === 'system'"
      :src="`/src/assets/cards/${card.img}`"
      :alt="card.name"
      class="max-h-full max-w-full hover:-translate-y-10"
      draggable="false"
    >
  </div>
</template>
