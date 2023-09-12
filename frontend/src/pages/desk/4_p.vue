<script setup lang="ts">
import { computed, onBeforeMount } from 'vue';
import { Icon } from '@iconify/vue';
import Card from '@/components/Card.vue';
import Player from '@/components/Player.vue';
import { useJudgementGame } from '@/composables/useJudgementGame';

const { gameState, currentRound, dealCards, finishRound } = useJudgementGame(4);
// Change player count

onBeforeMount(() => {
  dealCards();
});

function calculateRotationClass(playerIndex: number, index: number) {
  const rotation = index * 10 - (currentRound.value.hands[playerIndex].cards.length - 1) * 10 / 2;
  return `rotate-[${rotation}deg]`;
}

function calculateTranslationClass(_playerIndex: number, _index: number) {
  return '';
}

const newRoundButtonClass = computed(() => {
  return gameState.value.gameFinished ? 'bg-gray-500' : 'bg-red-500';
});

// const setBid = computed(() => {

// });

function newRound() {
  finishRound();
  dealCards();
}
</script>

<template>
  <div class="flex h-screen w-screen items-end overflow-hidden">
    <div class="relative flex h-1/3 w-full items-center justify-center">
      <div class="absolute top-0 z-50 flex items-center  justify-between">
        <Icon :class="currentRound.currentCallPlayer.id === gameState.players[0].id ? 'text-green-500' : 'text-black'" icon="ic:twotone-circle" />
        <p class=" pl-1">
          [ 0 / 3 ]
        </p>
      </div>
      <Card v-for="(card, index) in currentRound.hands[0].cards" :key="card.img" player="main" :card="card" class="absolute  origin-bottom " :class="[calculateRotationClass(0, index), calculateTranslationClass(0, index)]" />
    </div>
    <div class="fixed  left-[8%]  top-[100px] flex h-28 w-1/4 rotate-180 items-center justify-center">
      <Player :id="gameState.players[1].id" :turn="currentRound.currentCallPlayer.id === gameState.players[1].id ? 'text-green-500' : 'text-black'" name="Player 2" :tricks="0" :bid="3" :score="120" class="rotate-180" />
      <Card v-for="(card, index) in currentRound.hands[1].cards" :key="card.img" player="other" :card="card" class="absolute -top-4 h-[60px] w-[40px] origin-bottom" :class="calculateRotationClass(1, index)" />
    </div>
    <div class="fixed  left-[38%] top-[60px] flex  h-28 w-1/4 rotate-180 items-center justify-center">
      <Player :id="gameState.players[2].id" :turn="currentRound.currentCallPlayer.id === gameState.players[2].id ? 'text-green-500' : 'text-black'" name="Player 3" :tricks="0" :bid="3" :score="120" class="rotate-180" />
      <Card v-for="(card, index) in currentRound.hands[2].cards" :key="card.img" player="other" :card="card" class="absolute -top-4 h-[60px] w-[40px] origin-bottom" :class="calculateRotationClass(1, index)" />
    </div>
    <div class="fixed right-[8%] top-[100px] flex h-28 w-1/4 rotate-180 items-center justify-center">
      <Player :id="gameState.players[3].id" :turn="currentRound.currentCallPlayer.id === gameState.players[3].id ? 'text-green-500' : 'text-black'" name="Player 4" :tricks="0" :bid="3" :score="120" class="rotate-180" />
      <Card v-for="(card, index) in currentRound.hands[3].cards" :key="card.img" player="other" :card="card " class="absolute -top-4 h-[60px] w-[40px] origin-bottom" :class="calculateRotationClass(1, index)" />
    </div>
    <button :disabled="gameState.gameFinished" class="fixed right-0 top-0 p-2 text-white" :class="newRoundButtonClass" @click="newRound">
      New Round
    </button>
    <div class="fixed right-0 top-[37%]  m-2 h-[80px] w-[40px] flex-row items-center justify-center">
      <p class=" text-center text-xs text-white">
        TRUMP
      </p>
      <img :src="`/src/assets/cards/${currentRound.currentTrump}.svg`" alt="" class="max-h-full max-w-full">
    </div>
    <div class="fixed left-0 top-[35%]  m-2  h-[120px] w-[80px] flex-row items-center justify-center border-2 border-white sm:h-[160px] sm:w-[140px]">
      <p class=" mb-1 text-center text-[12px]  text-white sm:text-[16px]">
        Total score
      </p>
      <ul class=" text-center text-[12px]  text-white sm:text-[16px]">
        <li v-for="playerScore in gameState.players" :key="playerScore.id">
          {{ playerScore.name }} - {{ playerScore.score }}
        </li>
      </ul>
    </div>
  </div>
</template>
