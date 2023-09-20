<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router/auto';
import { storeToRefs } from 'pinia';
import { useJudgementGame } from '@/composables/useJudgementGame';
import PlayerHand from '@/components/PlayerHand.vue';
import OpponentHand from '@/components/OpponentHand.vue';
import { useCardMove } from '@/composables/useCardMove';
import Table from '@/components/Table.vue';

interface RouteParams {
  playerCount: 3 | 4 | 5
}

const route = useRoute();
const router = useRouter();
const { playerCount } = route.params as RouteParams;
if (playerCount < 3 || playerCount > 5)
  router.push('/404');
const judgementGameStore = useJudgementGame();
const { judgementGame, tableCards } = storeToRefs(judgementGameStore);
const { startGame } = judgementGameStore;
const { setCardsOnHandCount, setMousePosition, setWindowDimensions } = useCardMove();
setWindowDimensions(window.innerWidth, window.innerHeight);
startGame(playerCount);
const numberOfCardsOnHand = judgementGame!.value!.players[0].playerCards.length;
setCardsOnHandCount(numberOfCardsOnHand);
document.addEventListener('mousemove', setMousePosition);
</script>

<template>
  <div class="h-screen bg-gray-800 ">
    <div v-if="judgementGame && judgementGame.deck" class=" h-1/5 max-h-screen w-screen justify-between text-center align-bottom font-serif text-4xl text-white">
      <div class="relative flex h-screen flex-col">
        <!-- Top Div -->
        <div class="h-20 bg-blue-500">
          <!-- Child Divs Here -->
          <OpponentHand />
        </div>

        <!-- Middle Content -->
        <div class="flex flex-1">
          <!-- Left Side Div -->
          <div class="w-2/12 bg-green-500">
            <!-- Child Divs Here -->
            <OpponentHand />
          </div>

          <!-- Center (Empty) -->
          <div class="flex flex-1 items-center justify-center">
            <Table :cards="tableCards" />
          </div>

          <!-- Right Side Div -->
          <div class="w-2/12 bg-yellow-500">
            <!-- Child Divs Here -->
            <OpponentHand />
          </div>
        </div>

        <!-- Bottom Div -->
        <div class="static z-50 flex h-44 flex-col bg-red-500">
          <!-- Child Divs Here -->
          <PlayerHand key="playerHand" :player="judgementGame.players[0]" />
        </div>
      </div>
    </div>
  </div>
</template>
