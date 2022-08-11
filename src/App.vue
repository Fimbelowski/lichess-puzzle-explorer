<script setup lang="ts">
import {
  computed,
  ref,
} from 'vue';

import convertBytesToMb from '@/utilities/convertBytesToMb';

const puzzlesSize = ref(0);
const isLoadingPuzzlesMetadata = ref(false);
const isLoadingPuzzles = ref(false);

const puzzlesSizeInMb = computed(() => convertBytesToMb(puzzlesSize.value));

function loadPuzzlesMetadata() {
  isLoadingPuzzlesMetadata.value = true;

  const puzzlesMetadata = new XMLHttpRequest();
  puzzlesMetadata.open('HEAD', './src/assets/puzzles.csv');
  puzzlesMetadata.onload = () => {
    puzzlesSize.value = parseInt(puzzlesMetadata.getResponseHeader('content-length') || '0', 10);
    isLoadingPuzzlesMetadata.value = false;
  };

  puzzlesMetadata.send();
}

async function loadPuzzles() {
  isLoadingPuzzles.value = true;

  const puzzles = new XMLHttpRequest();
  puzzles.open('GET', './src/assets/puzzles.csv');
  puzzles.onload = () => {
    const response = puzzles.response as string;
    const arr = response
      .split('\n')
      .map((line) => {
        const [
          puzzleId,
          fen,
          moves,
          rating,
          ratingDeviation,
          popularity,
          nbPlays,
          themes,
          gameUrl,
          openingFamily,
          openingVariation,
        ] = line.split(',');

        return {
          fen,
          gameUrl,
          moves,
          nbPlays,
          openingFamily,
          openingVariation,
          popularity,
          puzzleId,
          rating,
          ratingDeviation,
          themes,
        };
      });
    console.log(arr);
    isLoadingPuzzles.value = false;
  };

  puzzles.send();
}

loadPuzzlesMetadata();
</script>

<template>
  <p
    v-if="isLoadingPuzzlesMetadata"
  >
    Loading Puzzles Metadata...
  </p>
  <div
    v-else
  >
    <p>
      The total size of all puzzles is: {{ puzzlesSizeInMb }} MB
    </p>
    <button
      @click="loadPuzzles"
    >
      Load All Puzzles
    </button>
    <p
      v-if="isLoadingPuzzles"
    >
      Loading Puzzles...
    </p>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
