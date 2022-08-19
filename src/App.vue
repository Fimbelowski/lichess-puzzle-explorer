<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import usePuzzleDatabase from './composables/usePuzzleDatabase';

const router = useRouter();
const puzzleDatabase = usePuzzleDatabase();

const isLoading = ref(false);

puzzleDatabase
  .isReady()
  .then((isReady) => {
    if (isReady) {
      isLoading.value = false;
      return;
    }

    router.replace('/warning');
  });
</script>

<template>
  <p
    v-if="isLoading"
  >
    Loading database...
  </p>
  <router-view
    v-else
  />
</template>
