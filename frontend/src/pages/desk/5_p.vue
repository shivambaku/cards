<script setup lang="ts">
import Card from '@/components/Card.vue';
</script>

<template>
  <div class="flex h-screen w-screen items-end bg-gray-800 pb-32 ">
    <div class="relative  flex h-1/3 w-full items-center justify-center">
      <Card class="absolute z-[1] origin-bottom rotate-[-60deg]" name="queen_of_spades" trump="true" />
      <Card class="absolute z-[2] origin-bottom rotate-[-50deg]" name="3_of_diamonds" trump="false" />
      <Card class="absolute z-[3] origin-bottom rotate-[-40deg]" name="ace_of_diamonds" trump="false" />
      <Card class="absolute z-[4] origin-bottom rotate-[-30deg]" name="queen_of_clubs" trump="false" />
      <Card class="absolute z-[5] origin-bottom rotate-[-20deg]" name="10_of_hearts" trump="false" />
      <Card class="absolute z-[6] origin-bottom rotate-[-10deg]" name="5_of_clubs" trump="false" />
      <Card class="absolute z-[7]" name="10_of_spades" trump="true" />
      <Card class="absolute z-[8] origin-bottom rotate-[10deg]" name="ace_of_hearts" trump="false" />
      <Card class="absolute z-[9] origin-bottom rotate-[20deg]" name="jack_of_spades" trump="true" />
      <Card class="absolute z-[10] origin-bottom rotate-[30deg]" name="king_of_hearts" trump="false" />
      <Card class="absolute z-[11] origin-bottom rotate-[40deg]" name="9_of_clubs" trump="false" />
      <Card class="absolute z-[12] origin-bottom rotate-[50deg]" name="7_of_diamonds" trump="false" />
      <Card class="absolute z-[13] origin-bottom rotate-[60deg]" name="6_of_spades" trump="true" />
    </div>
  </div>
</template>
