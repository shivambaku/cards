<script setup lang="ts">
import { computed, onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router/auto';
import { useJudgementGame } from '@/composables/useJudgementGame';
import MainPlayerView from '@/components/MainPlayerView.vue';

const route = useRoute();

const playerCount = Number((route.params as any).playerCount);

const judgementGame = useJudgementGame(playerCount);
const { gameState, currentRound, dealCards, finishRound, totalRounds, roundsPlayed } = judgementGame;

const lookingAtIndex = ref(0);

const newRoundButtonClass = computed(() => {
  return gameState.value.gameFinished ? 'bg-gray-500' : 'bg-red-500';
});

function newRound() {
  finishRound();
  dealCards();
}

onBeforeMount(() => {
  dealCards();
});
</script>

<template>
  <div class="flex h-screen w-screen justify-center overflow-hidden">
    <MainPlayerView
      :main-player-index="lookingAtIndex" :player-count="playerCount" :judgement-game="judgementGame"
    />
    <button :disabled="gameState.gameFinished" class=" fixed right-0 top-0 z-50 h-[40px] w-[100px] p-2 text-white" :class="newRoundButtonClass" @click="newRound">
      <p v-if=" totalRounds - roundsPlayed > 0">
        New Round
      </p>
      <p v-if=" totalRounds - roundsPlayed === 0">
        Finish
      </p>
    </button>
    <select v-model="lookingAtIndex" class="fixed left-0 top-0 z-50 h-[40px] w-[100px] " name="Players">
      <option v-for="(player, index) in gameState.players" :key="player.id" :value="index">
        {{ player.name }}
      </option>
    </select>
    <div class="fixed right-0 top-[43%]  m-2 h-[60px] w-[40px] flex-row items-center justify-center">
      <p class=" text-center text-xs text-white">
        TRUMP
      </p>
      <img :src="`/src/assets/cards/${currentRound.currentTrump}.svg`" alt="" class="max-h-full max-w-full">
      <div class="fixed right-0 top-[55%] m-1 flex-row items-center justify-center  text-center text-[12px] text-white sm:w-[140px] sm:text-[16px]">
        <p class="mb-1">
          Round - {{ totalRounds - (totalRounds - roundsPlayed) }}
        </p>
        <p class="mb-1">
          Total - {{ totalRounds }}
        </p>
        <p class="">
          Left - {{ totalRounds - roundsPlayed }}
        </p>
      </div>
    </div>
    <div class="fixed left-0 top-[50%] m-1 flex-row items-center justify-center p-1 text-center text-[12px] text-white sm:w-[140px] sm:text-[16px]">
      <p class=" ">
        Total score
      </p>
      <ul class=" ">
        <li v-for="playerScore in gameState.players" :key="playerScore.id">
          {{ playerScore.name }} - {{ playerScore.score }}
        </li>
      </ul>
    </div>
  </div>
</template>
