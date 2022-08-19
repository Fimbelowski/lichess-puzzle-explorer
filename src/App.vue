<script setup lang="ts">
import { ref } from 'vue';

import usePuzzleDatabaseStatus from '@/store/usePuzzleDatabaseStatus';

const databaseStatus = usePuzzleDatabaseStatus();

const isLoading = ref(false);

const isError = ref(false);
const errorMessage = ref('');

databaseStatus.onError = (error) => {
  console.error(error);

  isError.value = true;
  errorMessage.value = `Database error: ${error}`;
  isLoading.value = false;
};
</script>

<template>
  <p
    v-if="isLoading"
  >
    Loading database...
  </p>
  <p
    v-else-if="isError"
  >
    {{ errorMessage }}
  </p>
  <router-view
    v-else
  />
</template>
