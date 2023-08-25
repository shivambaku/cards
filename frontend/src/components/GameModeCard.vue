<script setup lang="ts">
import { useRouter } from 'vue-router';

defineProps({
  id: Number,
  title: String,
  playersCount: Number,
  roomsCount: Number,
});

const router = useRouter();

function goToNewRoute(id: any) {
  router.push(`/desk/${id}_p`);
}
</script>

<template>
  <div class="relative m-1 rounded-lg bg-white p-2 shadow-md md:h-[336px] md:w-[240px] md:p-4">
    <div class="flex h-full w-full flex-col flex-wrap justify-between">
      <p class="mb-2 text-center align-middle text-sm font-bold md:text-lg">
        {{ title }}
      </p>
      <p class="text-sm md:text-lg">
        Players: {{ playersCount }}
      </p>
      <p class="text-sm md:text-lg">
        Rooms: {{ roomsCount }}
      </p>
      <div class="flex flex-col justify-between">
        <button class="my-2 rounded-md bg-blue-500 p-2 text-sm text-white md:px-4 md:text-lg">
          Fast Play
        </button>
        <button class="my-2 rounded-md bg-green-500 px-4 py-2 text-sm text-white md:text-lg" @click="goToNewRoute(id)">
          Choose
        </button>
      </div>
    </div>
  </div>
</template>
