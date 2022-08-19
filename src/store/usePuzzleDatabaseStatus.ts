import { defineStore } from 'pinia';
import { ref } from 'vue';

import usePuzzleDatabase from '@/composables/usePuzzleDatabase';

const usePuzzleDatabaseStatus = defineStore('databaseStatus', () => {
  const puzzleDatabase = usePuzzleDatabase();

  const onError = ref((error: string) => {
    console.error(error);
  });
  const onReady = ref(() => {});
  const onUnready = ref(() => {});

  puzzleDatabase
    .open()
    .then(() => puzzleDatabase.isReady())
    .then(() => {})
    .catch((error) => {
      onError.value(error);
    });

  return {
    onError,
    onReady,
    onUnready,
  };
});

export default usePuzzleDatabaseStatus;
