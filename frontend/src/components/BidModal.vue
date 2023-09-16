<script lang="ts">
import { transformWithEsbuild } from 'vite';
import { defineComponent } from 'vue';

export default defineComponent({

  props: {
    min: Number,
    max: Number,
    name: String,
    bid: Number,
  },
  emits: ['close'],
  data() {
    return {
      inputValue: null as number | null,
      color: 'bg-white',
      openClose: 'hidden',
    };
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    openAlert() {
      this.openClose = 'hidden';
      if (this.max !== undefined && this.inputValue !== null) {
        if (this.max < this.inputValue)
          this.inputValue = this.max;
      }
      this.color = 'bg-white';
    },
    submit() {
      if (this.inputValue === null) {
        this.color = 'bg-red-200';
        this.openClose = 'show';
      }
      else {
        this.closeModal();
        console.log(this.name);
        console.log(this.inputValue);
        return this.inputValue;
      }
    },

  },

});
</script>

<template>
  <div class="fixed inset-0  z-50 flex items-center justify-center">
    <div class="mb-20 w-[220px] rounded-lg bg-white p-6 shadow-lg">
      <p class="mb-4 text-center text-sm font-semibold">
        {{ name }} <br> Please make a call
      </p>
      <p :class="openClose">
        Cant be null
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
