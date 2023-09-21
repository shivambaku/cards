<script setup lang="ts">
import { stringify } from 'node:querystring';
import { ref } from 'vue';
import type { JudgementPlayer, JudgementRoundCall } from '@/composables/useJudgementGame';

const props = defineProps<{
  min: number
  max: number
  player: JudgementPlayer
  makeCall: (call: JudgementRoundCall) => void
}>();

const emit = defineEmits<{
  close: []
}>();

const inputValue = ref<number | null | string>(null);
const color = ref('bg-white');
const openClose = ref('hidden');
const wrongCall = ref(false);

function closeModal() {
  emit('close');
}

function openAlert() {
  openClose.value = 'hidden';
  if (props.max !== undefined && inputValue.value !== null) {
    if (props.max < Number(inputValue.value))
      inputValue.value = props.max;
  }
  color.value = 'bg-white';
}

function submit() {
  wrongCall.value = false;
  if (inputValue.value === null || inputValue.value === '') {
    color.value = 'bg-red-200';
    openClose.value = 'show';
  }
  else {
    try {
      props.makeCall({ player: props.player, call: Number(inputValue.value), tricks: 0 });
    }
    catch (error) {
      color.value = 'bg-red-200';
      wrongCall.value = true;
      return;
    }
    closeModal();
  }
}
</script>

<template>
  <div class="fixed inset-0  z-[60] flex items-center justify-center">
    <div class="mb-20 w-[220px] rounded-lg bg-white p-6 shadow-lg">
      <p class="mb-4 text-center text-sm font-semibold">
        {{ player.name }} <br> Please make a call
      </p>
      <p :class="openClose">
        Cant be null
      </p>
      <p v-if="wrongCall">
        Invalid call
      </p>
      <input v-model="inputValue" :class="color" class=" mb-4  w-full rounded-md  border-2 border-black p-2" placeholder="Enter Bid" type="number" :min="min" :max="max" @input="openAlert">
      <div class="flex justify-center">
        <button class="rounded bg-gray-500 px-4 py-2 text-white hover:bg-green-600" @click="submit">
          Submit
        </button>
      </div>
    </div>
  </div>
</template>
