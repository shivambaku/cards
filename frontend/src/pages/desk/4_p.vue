<script setup lang="ts">
import { computed, ref } from 'vue';
import Card from '@/components/Card.vue';
import Player from '@/components/Player.vue';
import { useJudgementGame } from '@/composables/useJudgementGame';

const { gameState, newRound, roundFinished } = useJudgementGame(4);

newRound();

function calculateRotationClass(playerIndex: number, index: number) {
  const rotation
    = index * 10
    - ((gameState.value.players[playerIndex].cards.length - 1) * 10) / 2;

  return `rotate-[${rotation}deg]`;
}

function calculateTranslationClass(_playerIndex: number, _index: number) {
  return '';
}

const roundFinishedButtonClass = computed(() => {
  return gameState.value.gameFinished ? 'bg-gray-500' : 'bg-red-500';
});
const draggedElementRef = ref<HTMLElement | null>(null);

function allowDrop(ev: DragEvent): void {
  ev.preventDefault();
}

function drag(ev: DragEvent): void {
  const targetElement = ev.target as HTMLElement;
  ev.dataTransfer!.setData('text', targetElement.id);
  draggedElementRef.value = targetElement;
}

function drop(ev: DragEvent): void {
  ev.preventDefault();
  const targetElement = ev.target as HTMLElement;
  const draggedElement = draggedElementRef.value;

  if (draggedElement)
    targetElement.appendChild(draggedElement);

  draggedElementRef.value = null;
}
</script>

<template>
  <div class="flex h-screen w-screen items-end bg-gray-800 pb-5 ">
    <div
      class=" fixed left-1/4 top-[300px] flex  h-1/4 w-2/4 border-2  border-white p-1" @drop="drop"
      @dragover="allowDrop"
    />
    <div class="relative flex h-1/3 w-full items-center justify-center">
      <Card
        v-for="(card, index) in gameState.players[0].cards" :key="card.img" :card="card"
        class="absolute origin-bottom" :class="[
          calculateRotationClass(0, index),
          calculateTranslationClass(0, index),
        ]" @dragstart="drag"
      />
    </div>
    <div class="fixed left-2 top-[320px] flex h-28 w-1/4 rotate-180 items-center justify-center">
      <Player :id="gameState.players[1].id" name="Player 1" :tricks="0" :bid="3" :score="120" class="rotate-180" />
      <Card
        v-for="(card, index) in gameState.players[1].cards" :key="card.img" :card="card"
        class="absolute !h-[60px] !w-[40px] origin-bottom" :class="calculateRotationClass(1, index)" @dragstart="drag"
      />
    </div>
    <div class="fixed right-2 top-[320px] flex h-28 w-1/4 rotate-180 items-center justify-center">
      <Player :id="gameState.players[2].id" name="Player 2" :tricks="0" :bid="3" :score="120" class="rotate-180" />
      <Card
        v-for="(card, index) in gameState.players[2].cards" :key="card.img" :card="card"
        class="absolute !h-[60px] !w-[40px] origin-bottom" :class="calculateRotationClass(1, index)" @dragstart="drag"
      />
    </div>
    <div class="fixed left-[37%] top-[120px] flex h-28 w-1/4 rotate-180 items-center justify-center">
      <Player :id="gameState.players[3].id" name="Player 3" :tricks="0" :bid="3" :score="120" class="rotate-180" />
      <Card
        v-for="(card, index) in gameState.players[3].cards" :key="card.img" :card="card"
        class="absolute !h-[60px] !w-[40px] origin-bottom" :class="calculateRotationClass(1, index)" @dragstart="drag"
      />
    </div>
    <button
      :disabled="gameState.gameFinished" class="fixed right-0 top-0 p-2 text-white"
      :class="roundFinishedButtonClass" @click="roundFinished"
    >
      Finish Round
    </button>
    <div class="fixed top-0 !h-[60px] !w-[40px] flex-row items-center justify-center">
      <p class="text-center text-xs text-white">
        TRUMP
      </p>
      <img :src="`/src/assets/cards/${gameState.currentTrump}.svg`" alt="" class="max-h-full max-w-full">
    </div>
  </div>
</template>
