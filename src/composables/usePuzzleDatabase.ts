import { openDB } from 'idb';

const DATABASE_NAME = 'puzzles';
const DATABASE_VERSION = 1;
const OBJECT_STORE_NAME = 'puzzles';
const EXPECTED_RECORD_COUNT = 2904421;

export default function usePuzzleDatabase() {
  async function isReady() {
    const database = await openDB(DATABASE_NAME, DATABASE_VERSION, {
      upgrade() {
        return false;
      },
    });

    const transaction = database.transaction(OBJECT_STORE_NAME);
    const count = await transaction.objectStore(OBJECT_STORE_NAME).count();

    return count === EXPECTED_RECORD_COUNT;
  }

  return {
    isReady,
  };
}
