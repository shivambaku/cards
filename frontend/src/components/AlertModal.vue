<script setup lang="ts">
import { ref } from 'vue';
import type { JudgementPlayer, JudgementRoundCall } from '@/composables/useJudgementGame';

const props = defineProps<{
  status: string
  message: string
}>();

const emit = defineEmits<{
  close: []
}>();

const color = ref('bg-white');

function closeModal() {
  emit('close');
}
function alertMode() {
  if (props.status === 'green')
    color.value = 'bg-green';
  if (props.status === 'green')
    color.value = 'bg-red';
}

function submit() {
  closeModal();
}
</script>

<template>
  <div class="fixed inset-0  z-[60] flex items-center justify-center" @div="alertMode">
    <div class="mb-20 w-[220px] rounded-lg bg-white p-6 shadow-lg" :class="color">
      <p class="mb-4 text-center text-sm font-semibold">
        {{ props.message }}
      </p>
      <div class="flex justify-center">
        <button class="rounded bg-gray-500 px-4 py-2 text-white hover:bg-green-600" @click="submit">
          OK!
        </button>
      </div>
    </div>
  </div>
</template>
