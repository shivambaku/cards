<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { type Ref, computed, ref } from 'vue';
import CardVue from '@/components/Card.vue';
import Player from '@/components/Player.vue';
import BidModal from '@/components/BidModal.vue';
import type { JudgementPlayer, JudgementRound, JudgementRoundCall } from '@/composables/useJudgementGame';
import { type Card } from '@/composables/useCards';

const props = defineProps<{
  mainPlayerIndex: number
  playerCount: number
  currentRound: JudgementRound
  players: JudgementPlayer[]
  makeCall: (call: JudgementRoundCall) => void
}>();

const emit = defineEmits<{
  cardMouseDown: [Card, MouseEvent, HTMLElement, Ref<any[]>]
}>();

const cardRefs = ref<HTMLElement[]>([]);

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
    { x: 'left-3', y: 'top-[100px]' },
    { x: 'left-[23%]', y: 'top-[40px]' },
    { x: 'right-[23%]', y: 'top-[40px]' },
    { x: 'right-3', y: 'top-[100px]' },
  ],
];

const positionsForPlayers = computed(() => {
  return positions[props.playerCount - 3];
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

function cardMouseDown(card: Card, mouseEvent: MouseEvent, cardRef: HTMLElement) {
  emit('cardMouseDown', card, mouseEvent, cardRef, cardRefs);
}
</script>

<template>
  <BidModal v-if="showModal && currentRound.state === 'Calling'" :min="0" :max="currentRound.currentCardCount" :player="players[mainPlayerIndex]" :make-call="makeCall" @close="closeModal" />
  <div class="relative flex h-[35%] w-full items-center justify-center">
    <div class="absolute top-0 flex items-center  justify-between">
      <Icon :class="currentRound.currentCallPlayer.id === players[mainPlayerIndex].id ? 'text-green-500' : 'text-black'" icon="ic:twotone-circle" />
      <p class="pl-1">
        [ {{ myCall.tricks }} / {{ myCall.call }} ]
      </p>
    </div>
    <CardVue
      v-for="(card, index) in currentRound.hands[mainPlayerIndex].cards"
      ref="cardRefs" :key="card.img"
      player="main"
      :card="card"
      class="absolute origin-bottom"
      :class="[calculateRotationClass(0, index), calculateTranslationClass(0, index)]"
      @card-mouse-down="cardMouseDown"
    />
  </div>
  <div
    v-for="(position, index) in positionsForPlayers" :key="`position:${index}`"
    class="fixed flex h-28 w-1/4 rotate-180 items-center justify-center text-4xl"
    :class="[position.x, position.y]"
  >
    <Player :player="players[otherPlayerIndex(index)]" :call="otherPlayerCall(index)" :turn="currentRound.currentCallPlayer.id === players[otherPlayerIndex(index)].id ? 'text-green-500' : 'text-black'" class="rotate-180" />
    <CardVue
      v-for="(card, index2) in currentRound.hands[(mainPlayerIndex + index + 1) % playerCount].cards" :key="card.img" player="other" :card="card" class="absolute -top-4 h-[60px] w-[40px] origin-bottom"
      :class="calculateRotationClass(1, index2)"
    />
  </div>
</template>
