<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { computed, ref } from 'vue';
import Card from '@/components/Card.vue';
import Player from '@/components/Player.vue';
import BidModal from '@/components/BidModal.vue';
import type { JudgementPlayer, JudgementRound, JudgementRoundCall } from '@/composables/useJudgementGame';

const props = defineProps<{
  mainPlayerIndex: number
  playerCount: number
  currentRound: JudgementRound
  players: JudgementPlayer[]
  makeCall: (call: JudgementRoundCall) => void
}>();

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
  if (!props.currentRound.currentCallPlayer)
    return false;
  return props.currentRound.currentCallPlayer.id === props.mainPlayerIndex && !finishedBidding.value;
});

function closeModal() {
  finishedBidding.value = false;
}

function calculateRotationClass(playerIndex: number, index: number) {
  const rotation = index * 10 - (props.currentRound.hands[playerIndex].cards.length - 1) * 10 / 2;
  return `rotate-[${rotation}deg]`;
}

function calculateTranslationClass(_playerIndex: number, _index: number) {
  return '';
}

function getCallByPlayer(player: JudgementPlayer) {
  const judgementRoundCall = props.currentRound.calls.find(call => call.player.id === player.id);
  if (!judgementRoundCall) {
    return {
      call: 0,
      tricks: 0,
      player: props.players[props.mainPlayerIndex],
    };
  }
  return judgementRoundCall;
}

const myCall = computed(() => {
  return getCallByPlayer(props.players[props.mainPlayerIndex]);
});

function otherPlayerIndex(index: number) {
  return (props.mainPlayerIndex + index + 1) % props.playerCount;
}

function otherPlayerCall(index: number) {
  const otherPlayerIndex2 = otherPlayerIndex(index);
  return getCallByPlayer(props.players[otherPlayerIndex2]);
}
function PlayCard(card: any, index: any) {
  const divId = `${index}`;
  const divElement = document.getElementById(divId);

  if (divElement) {
    const imgElement = document.createElement('img');
    imgElement.src = `/src/assets/cards/${card.img}`;
    imgElement.alt = '';
    imgElement.className = 'max-h-full w-[40px] max-w-full';

    divElement.appendChild(imgElement);
  }
}
</script>

<template>
  <BidModal v-if="showModal && currentRound.state === 'Calling'" :min="0" :max="currentRound.currentCardCount" :player="players[mainPlayerIndex]" :make-call="makeCall" @close="closeModal" />
  <div class=" relative top-[35%] flex h-[27%] w-full flex-row  items-center justify-center">
    <div
      v-for="(positionsCard, index) in positionsForPlayedCards" :id="`${index}`"
      :key="`position:${index}`"
      class="absolute bottom-0 m-2 items-center justify-center" :class="[positionsCard.x, positionsCard.y, positionsCard.z]"
    />
  </div>

  <div class="fixed bottom-0 mb-0 flex h-[35%] w-full items-center justify-center">
    <div class="absolute -top-2 z-50 mb-2 flex items-center  justify-between">
      <Icon :class="currentRound.currentCallPlayer.id === players[mainPlayerIndex].id ? 'text-green-500' : 'text-black'" icon="ic:twotone-circle" />
      <p class=" pl-1 text-white">
        [ {{ myCall.tricks }} / {{ myCall.call }} ]
      </p>
    </div>
    <Card v-for="(card, index) in currentRound.hands[mainPlayerIndex].cards" :key="card.img" player="main" :card="card" class="absolute origin-bottom" :class="[calculateRotationClass(0, index), calculateTranslationClass(0, index)]" @dblclick="PlayCard(card, players[mainPlayerIndex].id)" />
  </div>
  <div
    v-for="(position, index) in positionsForPlayers" :key="`position:${index}`"
    class="fixed flex h-28 w-1/4 rotate-180 items-center justify-center text-4xl"
    :class="[position.x, position.y]"
  >
    <Player :player="players[otherPlayerIndex(index)]" :call="otherPlayerCall(index)" :turn="currentRound.currentCallPlayer.id === players[otherPlayerIndex(index)].id ? 'text-green-500' : 'text-black'" class="rotate-180" />
    <Card v-for="(card, index2) in currentRound.hands[(mainPlayerIndex + index + 1) % playerCount].cards" :key="card.img" player="other" :card="card" class="absolute -top-4 h-[60px] w-[40px] origin-bottom" :class="calculateRotationClass(1, index2)" />
  </div>
</template>
