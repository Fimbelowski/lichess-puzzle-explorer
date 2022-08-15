const DATABASE_NAME = 'puzzles';
const DATABASE_VERSION = 1;

export default function useIndexedDb() {
  function open() {
    return window.indexedDB.open(DATABASE_NAME, DATABASE_VERSION);
  }

  return {
    open,
  };
}
