import useIndexedDb from './useIndexedDb';

const DATABASE_NAME = 'puzzles';
const DATABASE_VERSION = 1;
const OBJECT_STORE_NAME = 'puzzles';

export default function usePuzzleDatabase() {
  const indexedDb = useIndexedDb();

  async function isReady() {
    if (!objectStoreExists()) {
      // Create object store/indices

      return false;
    }

    // Check to see if the object store contains the expected number of entries
    await indexedDb.transaction(OBJECT_STORE_NAME);

    return false;
  }

  function objectStoreExists() {
    if (indexedDb.database.value === undefined) {
      return false;
    }

    return indexedDb.database.value.objectStoreNames.contains(OBJECT_STORE_NAME);
  }

  function open() {
    return indexedDb.open(DATABASE_NAME, DATABASE_VERSION);
  }

  return {
    isReady,
    open,
  };
}
