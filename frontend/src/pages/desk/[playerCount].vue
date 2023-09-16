<script setup lang="ts">
import { computed, onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router/auto';
import { useJudgementGame } from '@/composables/useJudgementGame';
import MainPlayerView from '@/components/MainPlayerView.vue';

const route = useRoute();
const playerCount = Number((route.params as any).playerCount);

const { gameState, currentRound, dealCards, finishRound, totalRounds, roundsPlayed, makeCall } = useJudgementGame(playerCount);

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
  <div class="flex h-screen w-screen items-end overflow-hidden">
    <!-- <div class="fixed  left-[8%]  top-[90px] flex h-28 w-1/4 rotate-180 items-center justify-center">
      <Player :id="gameState.players[1].id" :turn="currentRound.currentCallPlayer.id === gameState.players[1].id ? 'text-green-500' : 'text-black'" name="Player 2" :tricks="0" :bid="3" :score="120" class="rotate-180" />
      <Card v-for="(card, index) in currentRound.hands[1].cards" :key="card.img" player="other" :card="card" class="absolute -top-4 h-[60px] w-[40px] origin-bottom" :class="calculateRotationClass(1, index)" />
    </div>
    <div class="fixed right-[8%] top-[90px] flex  h-28 w-1/4 rotate-180 items-center justify-center">
      <Player :id="gameState.players[2].id" :turn="currentRound.currentCallPlayer.id === gameState.players[2].id ? 'text-green-500' : 'text-black'" name="Player 3" :tricks="0" :bid="3" :score="120" class="rotate-180" />
      <Card v-for="(card, index) in currentRound.hands[2].cards" :key="card.img" player="other" :card="card" class="absolute -top-4 h-[60px] w-[40px] origin-bottom" :class="calculateRotationClass(1, index)" />
    </div> -->
    <MainPlayerView :make-call="makeCall" :main-player-index="lookingAtIndex" :current-round="currentRound" :players="gameState.players" :player-count="playerCount" />
    <button :disabled="gameState.gameFinished" class="fixed right-0 top-0 h-[40px] w-[100px] p-2 text-white" :class="newRoundButtonClass" @click="newRound">
      <p v-if=" totalRounds - roundsPlayed > 0">
        New Round
      </p>
      <p v-if=" totalRounds - roundsPlayed === 0">
        Finish
      </p>
    </button>
    <select v-model="lookingAtIndex" class="fixed left-[50%] top-0 z-50" name="Players">
      <option v-for="(player, index) in gameState.players" :key="player.id" :value="index">
        {{ player.name }}
      </option>
    </select>
    <div class="fixed right-0 top-[37%]  m-2 h-[80px] w-[40px] flex-row items-center justify-center">
      <p class=" text-center text-xs text-white">
        TRUMP
      </p>
      <img :src="`/src/assets/cards/${currentRound.currentTrump}.svg`" alt="" class="max-h-full max-w-full">
    </div>
    <div class="fixed left-0 top-[35%] m-1 flex-row items-center justify-center border-2  border-white  p-1 text-center text-[12px] text-white sm:w-[140px] sm:text-[16px]">
      <p class=" ">
        Total score
      </p>
      <ul class=" ">
        <li v-for="playerScore in gameState.players" :key="playerScore.id">
          {{ playerScore.name }} - {{ playerScore.score }}
        </li>
      </ul>
      <p class=" ">
        ----
      </p>
      <p class=" ">
        Rounds
      </p>
      <p class="mb-1">
        Total - {{ totalRounds }}
      </p>
      <p class="mb-1">
        Current  - {{ totalRounds - (totalRounds - roundsPlayed) }}
      </p>
      <p class="">
        Left - {{ totalRounds - roundsPlayed }}
      </p>
    </div>
  </div>
</template>
