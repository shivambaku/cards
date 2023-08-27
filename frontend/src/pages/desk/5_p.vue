<script setup lang="ts">
import { computed } from 'vue';
import Card from '@/components/Card.vue';
import Player from '@/components/Player.vue';
import { useJudgementGame } from '@/composables/useJudgementGame';

const { gameState, newRound } = useJudgementGame(5);

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

function calculateTranslationClass(_playerIndex: number, _index: number) {
  return '';
}

const newRoundButtonClass = computed(() => {
  return gameState.value.gameFinished ? 'bg-gray-500' : 'bg-red-500';
});
</script>

<template>
  <div class="flex h-screen w-screen items-end bg-gray-800 pb-5 ">
    <div class="relative flex h-1/3 w-full items-center justify-center">
      <Card v-for="(card, index) in gameState.players[0].cards" :key="card.img" :card="card" class="absolute origin-bottom" :class="[calculateRotationClass(0, index), calculateTranslationClass(0, index)]" />
    </div>
    <div class="fixed left-2 top-[120px] flex  h-28 w-1/4 rotate-180 items-center justify-center">
      <Player :id="gameState.players[1].id" name="Player 1" :tricks="0" :bid="3" :score="120" class="rotate-180" />
      <Card v-for="(card, index) in gameState.players[1].cards" :key="card.img" :card="card" class="absolute h-[60px] w-[40px] origin-bottom" :class="calculateRotationClass(1, index)" />
    </div>
    <div class="fixed right-2 top-[120px] flex h-28 w-1/4 rotate-180 items-center justify-center">
      <Player :id="gameState.players[2].id" name="Player 2" :tricks="0" :bid="3" :score="120" class="rotate-180" />
      <Card v-for="(card, index) in gameState.players[2].cards" :key="card.img" :card="card " class="absolute h-[60px] w-[40px] origin-bottom" :class="calculateRotationClass(1, index)" />
    </div>
    <div class="fixed  left-2 top-[320px] flex h-28 w-1/4 rotate-180 items-center justify-center">
      <Player :id="gameState.players[3].id" name="Player 3" :tricks="0" :bid="3" :score="120" class="rotate-180" />
      <Card v-for="(card, index) in gameState.players[3].cards" :key="card.img" :card="card" class="absolute h-[60px] w-[40px] origin-bottom" :class="calculateRotationClass(1, index)" />
    </div>
    <div class="fixed right-2 top-[320px] flex h-28 w-1/4 rotate-180 items-center justify-center">
      <Player :id="gameState.players[4].id" name="Player 4" :tricks="0" :bid="3" :score="120" class="rotate-180" />
      <Card v-for="(card, index) in gameState.players[4].cards" :key="card.img" :card="card" class="absolute h-[60px] w-[40px] origin-bottom" :class="calculateRotationClass(1, index)" />
    </div>
    <button :disabled="gameState.gameFinished" class="fixed right-0 top-0 p-2 text-white" :class="newRoundButtonClass" @click="newRound">
      New Round
    </button>
    <div class="fixed top-0 h-[60px] w-[40px] flex-row items-center justify-center">
      <p class=" text-center text-xs  text-white">
        TRUMP
      </p>
      <img :src="`/src/assets/cards/${gameState.currentTrump}.svg`" alt="" class="max-h-full max-w-full">
    </div>
  </div>
</template>
