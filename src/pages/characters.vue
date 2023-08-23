<script setup lang="ts">
import { useRickAndMortyApi } from '@/composables/useRickAndMortyApi';
import CharacterTable from '@/components/CharacterTable.vue';

const { charactersInfo, charactersLoading } = useRickAndMortyApi();
</script>

<template>
  <div class="flex flex-col bg-slate-800 md:flex-row md:flex-wrap md:justify-center ">
    <CharacterTable
      :characters="charactersInfo?.results!"
      :characters-loading="charactersLoading"
    />
  </div>
</template>
