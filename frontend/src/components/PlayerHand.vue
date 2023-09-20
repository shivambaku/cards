<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import type { JudgementGameplayer } from '@/composables/useJudgementGame';
import CardVue from '@/components/Card.vue';
import { getCardRotationDegrees } from '@/utilities/getCardRotationDegrees';
import { useCardMove } from '@/composables/useCardMove';
import type { Card } from '@/models/Card';
import { isOverTarget } from '@/utilities/isOverTarget';

const props = defineProps<{
  player: JudgementGameplayer | undefined
}>();

const playerHandRef = ref<HTMLElement | null>();
const cardRefs = ref([]);
const cardMoveStore = useCardMove();
const { cardsOnHandCount, isDragged, mousePosition, cardsCoords, cardCoord } = storeToRefs(cardMoveStore);
const cardRotations = computed(() => {
  return props.player?.playerCards.map((_, index) => getCardRotationDegrees(cardsOnHandCount.value!, index));
});
const offsetCoeff = props.player?.playerCards.length ? Math.ceil((20 - props.player?.playerCards.length) / 2) : 0;

function handleMouseDown(card: Card, index: number) {

}

watch([mousePosition.value], () => {
  for (let i = 0, len = cardsCoords.value.length; i < len; i++) {
    if (isOverTarget(cardCoord.value, cardsCoords.value[i])) {
      // // swap the cards
      // const temp = props.player!.playerCards[i];
      // props.player!.playerCards[i] = props.player!.playerCards[currentCardAndIndex.value!.index];
      // props.player!.playerCards[currentCardAndIndex.value!.index] = temp;
      // // // swap the coordinates
      // // const tempCoord = cardsCoords.value[currentCardAndIndex.value!.index];
      // // cardsCoords.value[currentCardAndIndex.value!.index] = cardsCoords.value[i];
      // // cardsCoords.value[i] = tempCoord;
      break;
    }
  }
});
</script>

<template>
  <div ref="playerHandRef" class="relative flex h-40 flex-col">
    <div v-if="props.player && props.player.playerCards && cardRotations " class="relative z-50 flex h-[100%] w-full items-end justify-center pb-1">
      <CardVue
        v-for="card, index in props.player?.playerCards"
        ref="cardRefs"
        :key="`card-${card.name}-`"
        :card="card"
        :offset-coeff="offsetCoeff"
        :index="index"
        :rotation="cardRotations[index]"
        @on-mouse-down="handleMouseDown"
      />
    </div>
  </div>
</template>
