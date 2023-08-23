<script setup lang="ts">
import { computed } from 'vue';
import { Icon } from '@iconify/vue';
import type { Character } from '@/composables/useRickAndMortyApi';

const props = defineProps<{
  character: Character
}>();

const characterColor = computed(() => {
  switch (props.character.status) {
    case 'Alive':
      return 'text-green-500';
    case 'Dead':
      return 'text-red-500';
    default:
      return 'text-gray-500';
  }
});
</script>

<template>
  <div class="m-3 overflow-hidden rounded-lg bg-zinc-700 text-white md:flex md:h-[220px] md:w-[600px]">
    <img class="w-full md:w-auto" :src="character.image">
    <div class="p-3">
      <div class="text-2xl font-bold">
        {{ character.name }}
      </div>
      <div class="flex">
        <Icon class="self-center pr-1" :class="[characterColor]" icon="mdi:circle" />
        {{ character.status }} - {{ character.species }}
      </div>
      <div class="mt-4">
        <div class="text-gray-400">
          Last known location:
        </div>
        <div>
          {{ character.location.name }}
        </div>
      </div>
      <div class="mt-4">
        <div class="text-gray-400">
          First seen in:
        </div>
        <div>
          {{ character.origin.name }}
        </div>
      </div>
    </div>
  </div>
</template>
