import {
  computed,
  ref,
} from 'vue';

import openDatabase from '@/utilities/openDatabase';

const DATABASE_NAME = 'puzzles';
const DATABASE_VERSION = 1;
// const OBJECT_STORE_NAME = 'puzzles';

export default function usePuzzleDatabase() {
  const database = ref<IDBDatabase>();
  const isError = ref(false);
  const errorMessage = ref('');

  const databaseExists = computed(() => database.value !== undefined);

  openDatabase(DATABASE_NAME, DATABASE_VERSION)
    .then((result) => {
      database.value = result;
    })
    .catch((error) => {
      isError.value = true;
      errorMessage.value = `Database error: ${error}`;
    });

  return {
    databaseExists,
    isError,
    errorMessage,
  };
}
