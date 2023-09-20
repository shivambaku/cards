<script setup lang="ts">
import { computed, defineProps, onMounted, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import type { Card } from '@/models/Card';
import CardVue from '@/components/Card.vue';
import { useCardMove } from '@/composables/useCardMove';
import { isOverTarget } from '@/utilities/isOverTarget';

const props = defineProps<{
  cards: Card[]
}>();

const cardMoveStore = useCardMove();
const { setTableCoords, setIsOverTable } = cardMoveStore;
const { cardCoord, tableCoord, isOverTable, mousePosition } = storeToRefs(cardMoveStore);
const tableRef = ref<HTMLElement | null>(null);

const hoverClass = computed(() => {
  return isOverTable.value ? 'shadow-[0px_0px_40px_30px_rgba(204,174,108,0.50)]' : '';
});
onMounted(() => {
  setTableCoords(tableRef);
});

watch([cardCoord.value], () => {
  if (isOverTarget(cardCoord.value, tableCoord.value))
    setIsOverTable(true);
  else
    setIsOverTable(false);
});
</script>

<template>
  <div
    ref="tableRef"
    class="flex h-2/3 w-2/3 rounded-full border-8 border-[#4B3425]
  bg-[url('/src/assets/game_view/poker_table_1.jpg')] bg-cover bg-center bg-no-repeat"
    :class="hoverClass"
  >
    <CardVue
      v-for="card, index in props.cards"
      :key="card.name"
      :card="card"
      :index="index"
      :offset-coeff="0"
      :rotation="0"
    />
  </div>
</template>
