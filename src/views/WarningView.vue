<script setup lang="ts">
import {
  computed,
  ref,
} from 'vue';

import convertBytesToMb from '@/utilities/convertBytesToMb';

const isLoading = ref(false);
const puzzlesSizeInBytes = ref(0);
const puzzlesSizeInMb = computed(() => convertBytesToMb(puzzlesSizeInBytes.value));

async function loadPuzzlesMetadata() {
  isLoading.value = true;

  let puzzles;

  try {
    puzzles = await fetch('/src/assets/puzzles.csv', {
      method: 'HEAD',
    });
    puzzlesSizeInBytes.value = parseInt(puzzles.headers.get('content-length') || '0', 10);
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
}

loadPuzzlesMetadata();
</script>

<template>
  <p
    v-if="isLoading"
  >
    Loading...
  </p>
  <div
    v-else
  >
    <p>
      Warning!
    </p>
    <p>
      The puzzles file is {{ puzzlesSizeInMb }} MB.
    </p>
    <p>
      Consider waiting to download the puzzles if you have a limited amount of data.
    </p>
    <button>
      Download Puzzles
    </button>
  </div>
</template>
