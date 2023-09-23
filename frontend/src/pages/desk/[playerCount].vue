<script setup lang="ts">
import { type Ref, computed, onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router/auto';
import { useDraggable, useDropZone, useElementBounding } from '@vueuse/core';
import { useJudgementGame } from '@/composables/useJudgementGame';
import MainPlayerView from '@/components/MainPlayerView.vue';
import CardVue from '@/components/Card.vue';
import { type Card, Suit } from '@/composables/useCards';

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

const dropZoneRef = ref<HTMLDivElement>();

const draggingCard = ref<Card | null>(null);
const draggingCardIndex = ref<number | null>(null);
const draggingCardRef = ref<HTMLElement | null>(null);

const ghostCard = ref<Card>({
  img: 'back.svg',
  value: 0,
  suit: Suit.Clubs,
  name: 'ghost',
});

function isColliding(element: HTMLElement, otherElement: HTMLElement) {
  const a = element.getBoundingClientRect();
  const b = otherElement.getBoundingClientRect();

  return !(
    a.top + a.height < b.top
    || a.top > b.top + b.height
    || a.left + a.width < b.left
    || a.left > b.left + b.width
  );
}

function cardMouseDown(card: Card, mouseEvent: MouseEvent, cardRef: HTMLElement, cardRefs: Ref<any[]>) {
  const cardIndex = currentRound.value.hands[lookingAtIndex.value].cards.findIndex(c => c.img === card.img);
  currentRound.value.hands[lookingAtIndex.value].cards[cardIndex] = ghostCard.value;
  draggingCard.value = card;
  draggingCardIndex.value = cardIndex;

  if (!draggingCardRef.value)
    return;

  moveAt(mouseEvent.clientX, mouseEvent.clientY);

  function moveAt(x: number, y: number) {
    const left = x - 60;
    const right = y - 90;

    draggingCardRef.value!.style.left = `${left}px`;
    draggingCardRef.value!.style.top = `${right}px`;

    if (isColliding(draggingCardRef.value!, dropZoneRef.value!))
      dropZoneRef.value!.style.border = '8px solid red';

    else
      dropZoneRef.value!.style.border = 'none';

    let otherCardIndex = 0;
    for (const otherCardRef of cardRefs.value) {
      if (isColliding(draggingCardRef.value!, otherCardRef.cardRef)) {
        otherCardRef.cardRef.style.border = '2px solid red';
        currentRound.value.hands[lookingAtIndex.value].cards.splice(draggingCardIndex.value!, 1);
        currentRound.value.hands[lookingAtIndex.value].cards.splice(otherCardIndex, 0, ghostCard.value);
        draggingCardIndex.value = otherCardIndex;
        break;
      }

      else { otherCardRef.cardRef.style.border = 'none'; }

      ++otherCardIndex;
    }
  }

  function onMouseMove(event: MouseEvent) {
    moveAt(event.pageX, event.pageY);
  }

  function onMouseUp(_: MouseEvent) {
    if (isColliding(draggingCardRef.value!, dropZoneRef.value!))
      currentRound.value.hands[lookingAtIndex.value].cards.splice(draggingCardIndex.value!, 1);
    else
      currentRound.value.hands[lookingAtIndex.value].cards[draggingCardIndex.value!] = draggingCard.value!;

    draggingCard.value = null;
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);
  }

  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('mouseup', onMouseUp);
}

onBeforeMount(() => {
  dealCards();
});
</script>

<template>
  <div class="flex h-screen w-screen items-end overflow-hidden">
    <MainPlayerView
      :make-call="makeCall" :main-player-index="lookingAtIndex"
      :current-round="currentRound"
      :players="gameState.players"
      :player-count="playerCount"
      @card-mouse-down="cardMouseDown"
    />
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
    <div
      ref="dropZoneRef"
      class="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 bg-orange-400 text-white"
    />
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

    <div
      ref="draggingCardRef"
      style="position: absolute;"
      @mouseDown="mouseDown"
    >
      <CardVue
        v-if="draggingCard"
        player="system"
        :card="draggingCard"
      />
    </div>
  </div>
</template>
