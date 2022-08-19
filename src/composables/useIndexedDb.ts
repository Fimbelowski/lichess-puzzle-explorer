import { ref } from 'vue';

export default function useIndexedDb() {
  const database = ref<IDBDatabase>();

  function createObjectStore(name: string, options: IDBObjectStoreParameters) {
    //
  }

  function open(name: string, version?: number) {
    return new Promise<void>((resolve, reject) => {
      const request = window.indexedDB.open(name, version);

      request.onerror = (event) => {
        const target = event.target as IDBOpenDBRequest;
        reject(target.error);
      };

      request.onsuccess = (event) => {
        const target = event.target as IDBOpenDBRequest;
        database.value = target.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const target = event.target as IDBOpenDBRequest;
        database.value = target.result;
        resolve();
      };
    });
  }

  function transaction(storeNames: string | string[], mode: 'readonly' | 'readwrite' = 'readonly') {
    return new Promise((resolve, reject) => {
      if (database.value === undefined) {
        reject(new Error('Transaction cannot be opened if the database is undefined.'));
        return;
      }

      const request = database.value.transaction(storeNames, mode);

      request.onabort = () => {
        reject(new Error('Transaction aborted.'));
      };

      request.oncomplete = (event) => {
        console.log(event);
        resolve(event);
      };

      request.onerror = (error) => {
        reject(error);
      };
    });
  }

  return {
    createObjectStore,
    database,
    open,
    transaction,
  };
}
