<script setup lang="ts">
import usePuzzleDatabase from '@/composables/usePuzzleDatabase';

const puzzleDatabase = usePuzzleDatabase();
</script>

<template>
  <router-view
    v-if="puzzleDatabase.databaseExists"
  />
  <p
    v-else-if="puzzleDatabase.isError"
  >
    {{ puzzleDatabase.errorMessage }}
  </p>
  <p
    v-else
  >
    Loading database...
  </p>
</template>
