<script setup lang="ts">
import { computed } from 'vue';
import Card from '@/components/Card.vue';
import { useJudgementGame } from '@/composables/useJudgementGame';

const { gameState, newRound } = useJudgementGame(3);

newRound();

function calculateRotationClass(playerIndex: number, index: number) {
  const rotation = index * 10 - (gameState.value.players[playerIndex].cards.length - 1) * 10 / 2;

  const rotations = [
    'rotate-[-85deg]',
    'rotate-[-80deg]',
    'rotate-[-75deg]',
    'rotate-[-70deg]',
    'rotate-[-65deg]',
    'rotate-[-60deg]',
    'rotate-[-55deg]',
    'rotate-[-50deg]',
    'rotate-[-45deg]',
    'rotate-[-40deg]',
    'rotate-[-35deg]',
    'rotate-[-30deg]',
    'rotate-[-25deg]',
    'rotate-[-20deg]',
    'rotate-[-15deg]',
    'rotate-[-10deg]',
    'rotate-[-5deg]',
    'rotate-[0deg]',
    'rotate-[5deg]',
    'rotate-[10deg]',
    'rotate-[15deg]',
    'rotate-[20deg]',
    'rotate-[25deg]',
    'rotate-[30deg]',
    'rotate-[35deg]',
    'rotate-[40deg]',
    'rotate-[45deg]',
    'rotate-[50deg]',
    'rotate-[55deg]',
    'rotate-[60deg]',
    'rotate-[65deg]',
    'rotate-[70deg]',
    'rotate-[75deg]',
    'rotate-[80deg]',
    'rotate-[85deg]',
    'rotate-[90deg]',
  ];

  return `rotate-[${rotation}deg]`;
}

function calculateTranslationClass(playerIndex: number, index: number) {
  return '';
}

const newRoundButtonClass = computed(() => {
  return gameState.value.gameFinished ? 'bg-gray-500' : '';
});
</script>

<template>
  <div class="flex h-screen w-screen items-end bg-gray-800 pb-32 ">
    <div class="relative flex h-1/3 w-full items-center justify-center">
      <Card v-for="(card, index) in gameState.players[0].cards" :key="card.img" :name="card.img" class="absolute origin-bottom" :class="[calculateRotationClass(0, index), calculateTranslationClass(0, index)]" />
    </div>
    <div class="fixed top-5 flex h-1/3 w-full rotate-180 items-center justify-center">
      <Card v-for="(card, index) in gameState.players[1].cards" :key="card.img" :name="card.img" class="absolute origin-bottom" :class="calculateRotationClass(1, index)" />
    </div>
    <button :disabled="gameState.gameFinished" class="bg-red-500 p-2 text-white" :class="newRoundButtonClass" @click="newRound">
      New Round
    </button>
  </div>
</template>
