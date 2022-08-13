<script setup lang="ts">
import {
  computed,
  ref,
} from 'vue';

import CheckboxInput from '@/components/CheckboxInput.vue';
import convertBytesToMb from '@/utilities/convertBytesToMb';
import Puzzle from '@/types/Puzzle';

const isLoadingPuzzlesMetadata = ref(false);
const puzzlesSizeInBytes = ref(0);
const puzzlesSizeInMb = computed(() => convertBytesToMb(puzzlesSizeInBytes.value));

const hasAcknowledgedWarning = ref(false);

const isLoadingPuzzles = ref(false);
const bytesLoaded = ref(0);
const percentageLoaded = computed(
  () => ((bytesLoaded.value / puzzlesSizeInBytes.value) * 100).toFixed(1),
);

const puzzles = ref<Puzzle[]>([]);

async function loadPuzzlesMetadata() {
  isLoadingPuzzlesMetadata.value = true;

  let response;

  try {
    response = await fetch('/src/assets/puzzles.csv', {
      method: 'HEAD',
    });
    puzzlesSizeInBytes.value = parseInt(response.headers.get('content-length') || '0', 10);
  } catch (error) {
    console.error(error);
  } finally {
    isLoadingPuzzlesMetadata.value = false;
  }
}

async function loadPuzzles() {
  isLoadingPuzzles.value = true;

  let response: Response;

  try {
    response = await fetch('/src/assets/puzzles.csv');
  } catch (error) {
    console.error(error);
    isLoadingPuzzles.value = false;
    return;
  }

  const reader = response.body?.getReader();
  const chunks: Uint8Array[] = [];

  const intervalId = setInterval(async () => {
    const readResult = await reader?.read();

    if (readResult === undefined) {
      return;
    }

    const {
      done,
      value,
    } = readResult;

    if (done) {
      const combinedChunks = new Uint8Array(bytesLoaded.value);
      let position = 0;

      chunks.forEach((chunk) => {
        combinedChunks.set(chunk, position);
        position += chunk.length;
      });

      const result = new TextDecoder('utf-8').decode(combinedChunks);
      puzzles.value = result
        .split('\n')
        .filter((puzzleString) => puzzleString !== '')
        .map((puzzleString) => {
          const [
            puzzleId,
            fen,
            moves,
            rating,
            ratingDeviation,
            popularity,
            plays,
            themes,
            gameUrl,
            openingFamily,
            openingVariation,
          ] = puzzleString.split(',');

          return {
            fen,
            gameUrl,
            moves: moves.split(' ').length,
            openingFamily: openingFamily || undefined,
            openingVariation,
            plays: parseInt(plays, 10),
            popularity: parseInt(popularity, 10),
            puzzleId,
            rating: parseInt(rating, 10),
            ratingDeviation: parseInt(ratingDeviation, 10),
            themes: themes.split(' '),
          };
        });

      isLoadingPuzzles.value = false;
      clearInterval(intervalId);
    }

    if (value !== undefined) {
      bytesLoaded.value += value.length;
      chunks.push(value);
    }
  }, 100);
}

loadPuzzlesMetadata();
</script>

<template>
  <p
    v-if="isLoadingPuzzlesMetadata"
  >
    Loading puzzles metadata...
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
    <CheckboxInput
      id="warning-acknowledgement"
      v-model="hasAcknowledgedWarning"
      :disabled="hasAcknowledgedWarning"
      label="I understand"
    />
    <button
      :disabled="!hasAcknowledgedWarning || isLoadingPuzzles"
      @click="loadPuzzles"
    >
      Download Puzzles
    </button>
    <div
      v-if="isLoadingPuzzles"
    >
      <p>
        Loading puzzles...
      </p>
      <p>
        {{ percentageLoaded }}%
      </p>
    </div>
  </div>
</template>
