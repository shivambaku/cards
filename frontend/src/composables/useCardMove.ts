import { type Ref, ref } from 'vue';
import { defineStore } from 'pinia';

export const useCardMove = defineStore('cardMoveStore', () => {
  const numberOfCardsOnHand = ref<number>(0);
  const isDragged = ref(false);
  const isOnTable = ref(false);
  const isOverTable = ref(false);
  const isOverHand = ref(false);
  const cardsOnHandCount = ref(numberOfCardsOnHand);
  const windowDimensions = ref<{ width: number; height: number }>({ width: 0, height: 0 });
  const mousePosition = ref<{ x: number; y: number }>({ x: 0, y: 0 });
  const cardCoord = ref<{ x: number; y: number; height: number; width: number }>({ x: 0, y: 0, height: 0, width: 0 });
  const cardsCoords = ref<typeof cardCoord.value[]>([]);
  const tableCoord = ref<{ x: number; y: number; height: number; width: number }>({ x: 0, y: 0, height: 0, width: 0 });
  const playeHandCoord = ref<{ x: number; y: number; height: number; width: number }>({ x: 0, y: 0, height: 0, width: 0 });

  function setWindowDimensions(width: number, height: number) {
    windowDimensions.value.width = width;
    windowDimensions.value.height = height;
  };

  function setMousePosition(e: MouseEvent) {
    mousePosition.value.x = e.clientX;
    mousePosition.value.y = e.clientY;
  }

  function setPlayerHandCoords(el: Ref<HTMLElement | null>) {
    if (el.value) {
      playeHandCoord.value.x = el.value.getBoundingClientRect().x;
      playeHandCoord.value.y = el.value.getBoundingClientRect().y;
      playeHandCoord.value.height = el.value.getBoundingClientRect().height;
      playeHandCoord.value.width = el.value.getBoundingClientRect().width;
    }
  }
  function resetCardCoords() {
    cardsCoords.value = [];
  }

  function setCardCoord(el: Ref<HTMLElement | null>) {
    if (el.value) {
      cardCoord.value.x = el.value.getBoundingClientRect().x;
      cardCoord.value.y = el.value.getBoundingClientRect().y;
      cardCoord.value.height = el.value.getBoundingClientRect().height;
      cardCoord.value.width = el.value.getBoundingClientRect().width;
    }
  }

  function setCardCoordsAtIndex(index: number, el: Ref<HTMLElement | null>) {
    const x = el.value?.getBoundingClientRect().x || 0;
    const y = el.value?.getBoundingClientRect().y || 0;
    const height = el.value?.getBoundingClientRect().height || 0;
    const width = el.value?.getBoundingClientRect().width || 0;
    cardsCoords.value[index] = { x, y, height, width };
  }

  function resetCardCoord() {
    cardCoord.value.x = 0;
    cardCoord.value.y = 0;
    cardCoord.value.height = 0;
    cardCoord.value.width = 0;
  }

  function setTableCoords(el: Ref<HTMLElement | null>) {
    if (el.value) {
      tableCoord.value.x = el.value.getBoundingClientRect().x;
      tableCoord.value.y = el.value.getBoundingClientRect().y;
      tableCoord.value.height = el.value.getBoundingClientRect().height;
      tableCoord.value.width = el.value.getBoundingClientRect().width;
    }
  }

  function setIsOnTable(onTable: boolean) {
    isOnTable.value = onTable;
  }
  function setIsDragged(dragging: typeof isDragged.value) {
    isDragged.value = dragging;
  }

  function setCardsOnHandCount(count: number) {
    cardsOnHandCount.value = count;
  }

  function setIsOverTable(overTheTable: boolean) {
    isOverTable.value = overTheTable;
  }
  function decrementCardsOnHandCount() {
    cardsOnHandCount.value!--;
  }

  function incrementCardsOnHandCount() {
    cardsOnHandCount.value!++;
  }

  return {
    cardCoord,
    cardsCoords,
    isDragged,
    isOnTable,
    isOverHand,
    cardsOnHandCount,
    mousePosition,
    tableCoord,
    isOverTable,
    setWindowDimensions,
    setMousePosition,
    setPlayerHandCoords,
    resetCardCoords,
    setCardCoord,
    setCardCoordsAtIndex,
    setIsDragged,
    setCardsOnHandCount,
    resetCardCoord,
    decrementCardsOnHandCount,
    incrementCardsOnHandCount,
    setIsOnTable,
    setIsOverTable,
    setTableCoords,
  };
});
