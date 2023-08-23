<script setup lang="ts">
defineProps({
  id: Number,
  title: String,
  playersCount: Number,
  roomsCount: Number,
});
</script>

<template>
  <div class="relative m-1 rounded-lg bg-white p-4 shadow-md md:h-[336px] md:w-[240px]">
    <div class="flex h-full w-full flex-col flex-wrap justify-between">
      <h2 class="mb-2 text-center align-middle text-xl  font-bold">
        {{ title }}
      </h2>
      <p>Players: {{ playersCount }}</p>
      <p>Rooms: {{ roomsCount }}</p>
      <div class="flex flex-col justify-between">
        <button class="my-2 rounded-md bg-blue-500 px-4 py-2 text-white">
          Fast Play
        </button>
        <button class="my-2 rounded-md bg-green-500 px-4 py-2 text-white">
          Choose
        </button>
      </div>
    </div>
  </div>
</template>
