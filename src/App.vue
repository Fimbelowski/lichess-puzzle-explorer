<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import usePuzzleDatabase from '@/composables/usePuzzleDatabase';

const router = useRouter();
const puzzleDatabase = usePuzzleDatabase();

const databaseExists = ref(false);
const failedToOpenDatabase = ref(false);
const databaseErrorMessage = ref('');

const openDatabaseRequest = puzzleDatabase.open();
openDatabaseRequest.onsuccess = () => {
  databaseExists.value = true;

  const { result } = openDatabaseRequest;

  if (result.objectStoreNames.length === 0) {
    router.replace('/warning');
  }
};
openDatabaseRequest.onerror = (event) => {
  const target = event.target as IDBOpenDBRequest;
  databaseErrorMessage.value = `Database error: ${target.error}`;
};
</script>

<template>
  <router-view
    v-if="databaseExists"
  />
  <p
    v-else-if="failedToOpenDatabase"
  >
    {{ databaseErrorMessage }}
  </p>
  <p
    v-else
  >
    Checking database...
  </p>
</template>
