<script setup lang="ts">
import type { Character } from '@/composables/useRickAndMortyApi';
import CharacterCard from '@/components/CharacterCard.vue';

defineProps<{
  characters: Character[] | undefined
  charactersLoading: boolean
}>();
</script>

<template>
  <div class="flex flex-col bg-slate-800 md:flex-row md:flex-wrap md:justify-center">
    <div v-if="charactersLoading" class="text-2xl text-white">
      Loading...
    </div>
    <CharacterCard
      v-for="character in characters"
      v-else
      :key="character.id"
      :character="character"
    />
  </div>
</template>
