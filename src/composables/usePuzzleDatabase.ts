import {
  computed,
  ref,
} from 'vue';

const DATABASE_NAME = 'puzzles';
const DATABASE_VERSION = 1;
// const OBJECT_STORE_NAME = 'puzzles';

export default function usePuzzleDatabase() {
  const database = ref<IDBDatabase>();
  const isError = ref(false);
  const errorMessage = ref('');

  const databaseExists = computed(() => database.value !== undefined);

  const openDatabaseRequest = window.indexedDB.open(DATABASE_NAME, DATABASE_VERSION);
  openDatabaseRequest.onerror = (event) => {
    isError.value = true;

    const target = event.target as IDBOpenDBRequest;
    errorMessage.value = `Database Error: ${target.error}`;
    console.error(errorMessage.value);
  };
  openDatabaseRequest.onsuccess = (event) => {
    // A connection to the database is opened successfully. If database.value is undefined here, the
    // database already exists.
    const target = event.target as IDBOpenDBRequest;
    database.value = target.result;
  };
  openDatabaseRequest.onupgradeneeded = (event) => {
    // Database is created for the first time or is opened with a version number higher than the
    // existing one.
    const target = event.target as IDBOpenDBRequest;
    database.value = target.result;
  };

  return {
    databaseExists,
    isError,
    errorMessage,
  };
}
