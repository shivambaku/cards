<script setup lang="ts">
import Card from '@/components/card.vue';
</script>

<template>
  <div class="h-screen w-screen bg-gray-800">
    <div class="fixed bottom-24 flex h-[120px] w-full items-center justify-center">
      <Card class="z-[1] ml-5" name="queen_of_spades" trump="true" />
      <Card class="z-[2] ml-5" name="3_of_diamonds" trump="false" />
      <Card class="z-[3] ml-5" name="ace_of_diamonds" trump="false" />
      <Card class="z-[4] ml-5" name="queen_of_clubs" trump="false" />
      <Card class="z-[5] ml-5" name="10_of_hearts" trump="false" />
      <Card class="z-[6] ml-5" name="5_of_clubs" trump="false" />
      <Card class="z-[7] ml-5" name="10_of_spades" trump="true" />
      <Card class="z-[8] ml-5" name="ace_of_hearts" trump="false" />
      <Card class="z-[9] ml-5" name="jack_of_spades" trump="true" />
      <Card class="z-[10] ml-5" name="king_of_hearts" trump="false" />
      <Card class="z-[11] ml-5" name="9_of_clubs" trump="false" />
      <Card class="z-[12] ml-5" name="7_of_diamonds" trump="false" />
      <Card class="z-[13] ml-5" name="6_of_spades" trump="true" />
    </div>
  </div>
</template>
