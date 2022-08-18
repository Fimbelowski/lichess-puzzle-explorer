import {
  computed,
  ref,
} from 'vue';

const DATABASE_NAME = 'puzzles';
const DATABASE_VERSION = 1;
const OBJECT_STORE_NAME = 'puzzles';

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

    const objectStore = database.value.createObjectStore(OBJECT_STORE_NAME, { keyPath: 'puzzleId' });

    // Create indices
    objectStore.createIndex('fen', 'fen', { unique: true });
    objectStore.createIndex('moves', 'moves', { unique: false, multiEntry: false });
    objectStore.createIndex('rating', 'rating', { unique: false });
    objectStore.createIndex('ratingDeviation', 'ratingDeviation', { unique: false });
    objectStore.createIndex('popularity', 'popularity', { unique: false });
    objectStore.createIndex('plays', 'plays', { unique: false });
    objectStore.createIndex('themes', 'themes', { unique: false, multiEntry: true });
    objectStore.createIndex('gameUrl', 'gameUrl', { unique: true });
    objectStore.createIndex('openingFamily', 'openingFamily', { unique: false });
    objectStore.createIndex('openingVariation', 'openingVariation', { unique: false });
  };

  return {
    databaseExists,
    isError,
    errorMessage,
  };
}
