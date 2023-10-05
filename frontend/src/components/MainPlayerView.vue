<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { computed, ref } from 'vue';
import CardVue from '@/components/Card.vue';
import Player from '@/components/Player.vue';
import BidModal from '@/components/BidModal.vue';
import type { JudgementGame, JudgementGameStatus, JudgementPlayer } from '@/composables/useJudgementGame';
import type { Card } from '@/composables/useCards';
import AlertModal from '@/components/AlertModal.vue';

interface DisplayCard {
  card: Card
  tor: number
}

const props = defineProps<{
  mainPlayerIndex: number
  playerCount: number
  judgementGame: JudgementGame
}>();

const { gameState, currentRound, currentTurn, currentPlayer, makeCall, playCard } = props.judgementGame;

const players = computed(() => gameState.value.players);

const positions = [
  [
    { x: 'left-[8%]', y: 'top-[90px]' },
    { x: 'right-[8%]', y: 'top-[90px]' },
  ],
  [
    { x: 'left-[8%]', y: 'top-[100px]' },
    { x: 'left-[38%]', y: 'top-[60px]' },
    { x: 'right-[8%]', y: 'top-[100px]' },
  ],
  [
    { x: 'left-3', y: 'top-[120px]' },
    { x: 'left-[23%]', y: 'top-[60px]' },
    { x: 'right-[23%]', y: 'top-[60px]' },
    { x: 'right-3', y: 'top-[120px]' },
  ],
];

const positionsCards = [
  [
    { x: 'bottom-0', y: '', z: '' },
    { x: 'left-[28%]', y: 'top-0', z: 'rotate-[-25deg]' },
    { x: 'right-[28%]', y: 'top-0', z: 'rotate-[25deg]' },
  ],
  [
    { x: 'bottom-0', y: '', z: '' },
    { x: 'left-[28%]', y: 'top-0', z: 'rotate-[-25deg]' },
    { x: '', y: 'top-0', z: '' },
    { x: 'right-[28%]', y: 'top-0', z: 'rotate-[25deg]' },
  ],
  [
    { x: 'bottom-0', y: '', z: '' },
    { x: 'left-[18%]', y: 'top-0', z: 'rotate-[-25deg]' },
    { x: 'left-[34%]', y: 'top-0', z: 'rotate-[-15deg]' },
    { x: 'right-[34%]', y: 'top-0', z: 'rotate-[15deg]' },
    { x: 'right-[18%]', y: 'top-0', z: 'rotate-[25deg]' },
  ],
];

const positionsForPlayers = computed(() => {
  return positions[props.playerCount - 3];
});

const positionsForPlayedCards = computed(() => {
  return positionsCards[props.playerCount - 3];
});

const finishedBidding = ref(false);

const showModal = computed(() => {
  if (!currentRound.value.currentCallPlayer)
    return false;
  return currentRound.value.currentCallPlayer.id === props.mainPlayerIndex && !finishedBidding.value;
});
const alertStatus = ref('');
const alertMessage = ref('');
const alertShow = ref(false);

function showAlert(status: string, message: string, _show: boolean) {
  alertStatus.value = status;
  alertMessage.value = message;
  alertShow.value = true;
}

function closeAlert() {
  alertShow.value = false;
}

function closeModal() {
  finishedBidding.value = false;
}

function calculateRotationClass(playerIndex: number, index: number) {
  const rotation = index * 10 - (currentRound.value.hands[playerIndex].cards.length - 1) * 10 / 2;
  return `rotate-[${rotation}deg]`;
}

function calculateTranslationClass(_playerIndex: number, _index: number) {
  return '';
}

function getCallByPlayer(player: JudgementPlayer) {
  const judgementRoundCall = currentRound.value.calls.find(call => call.player.id === player.id);
  if (!judgementRoundCall) {
    return {
      call: 0,
      tricks: 0,
      player: players.value[props.mainPlayerIndex],
    };
  }
  return judgementRoundCall;
}

const myCall = computed(() => {
  return getCallByPlayer(players.value[props.mainPlayerIndex]);
});

function otherPlayerIndex(index: number) {
  return (props.mainPlayerIndex + index + 1) % props.playerCount;
}

function otherPlayerCall(index: number) {
  const otherPlayerIndex2 = otherPlayerIndex(index);
  return getCallByPlayer(players.value[otherPlayerIndex2]);
}

const displayedCards = ref<DisplayCard[]>([]);

function playCardClick(card: Card, tor: number, status: JudgementGameStatus) {
  if (status !== 'Playing')
    return;

  if (currentTurn.value.plays.some(x => x.player === players.value[tor]))
    showAlert('red', 'not your turn', true);

  try {
    playCard({
      player: players.value[tor],
      card,
    });
    displayedCards.value.push({ card, tor });

    if (displayedCards.value.length === props.playerCount)
      turnOver();
  }
  catch (error: any) {
    showAlert('red', error.toString(), true);
  }
}

function turnOver() {
  showAlert('red', currentRound.value.turns[currentRound.value.turns.length - 2].winner!.name, true);

  setTimeout(() => {
    closeAlert();
    displayedCards.value = [];
  }, 5 * 1000);
}
</script>

<template>
  <AlertModal v-if="alertShow" :status="alertStatus" :message="alertMessage" @close="closeAlert" />
  <BidModal
    v-if="showModal && currentRound.state === 'Calling'" :min="0" :max="currentRound.currentCardCount" :player="players[mainPlayerIndex]"
    :make-call="makeCall" @close="closeModal"
  />
  <div class=" relative bottom-0 top-[35%] flex h-[27%] w-full  flex-row items-center justify-center">
    <div
      v-for="(positionsCard, index) in positionsForPlayedCards" :id="`${index}`"
      :key="`position:${index}`"
      class="absolute bottom-0 m-2 items-center justify-center" :class="[positionsCard.x, positionsCard.y, positionsCard.z]"
    >
      <img
        v-for="(card, cardIndex) in displayedCards.filter(x => ((playerCount - (mainPlayerIndex - x.tor)) % playerCount) === index)"
        :key="`displayed-card-${cardIndex}`" :src="`/src/assets/cards/${card.card.img}`" class="max-h-full w-[40px] max-w-full"
      >
    </div>
  </div>
  <div class="fixed bottom-0 mb-0 flex h-[35%] w-full items-center justify-center" :class=" currentRound.state === 'Calling' ? 'pointer-events-none' : ''">
    <div class="absolute -top-2 z-50 mb-2 flex items-center  justify-between">
      <Icon :class="currentPlayer.id === players[mainPlayerIndex].id ? 'text-green-500' : 'text-black'" icon="ic:twotone-circle" />
      <p class=" pl-1 text-white">
        [ {{ myCall.tricks }} / {{ myCall.call }} ]
      </p>
    </div>
    <CardVue
      v-for="(card, index) in currentRound.hands[mainPlayerIndex].cards" :key="card.img" player="main" :card="card"
      class="absolute origin-bottom" :class="[calculateRotationClass(0, index), calculateTranslationClass(0, index)]"
      @dblclick="playCardClick(card, players[mainPlayerIndex].id, currentRound.state)"
    />
  </div>
  <div
    v-for="(position, index) in positionsForPlayers" :key="`position:${index}`"
    class="fixed flex h-28 w-1/4 rotate-180 items-center justify-center text-4xl"
    :class="[position.x, position.y]"
  >
    <Player
      :player="players[otherPlayerIndex(index)]" :call="otherPlayerCall(index)"
      :turn="currentPlayer.id === players[otherPlayerIndex(index)].id ? 'text-green-500' : 'text-black'" class="rotate-180"
    />
    <CardVue
      v-for="(card, index2) in currentRound.hands[(mainPlayerIndex + index + 1) % playerCount].cards" :key="card.img" player="other"
      :card="card" class="absolute -top-4 h-[60px] w-[40px] origin-bottom" :class="calculateRotationClass(1, index2)"
    />
  </div>
</template>
