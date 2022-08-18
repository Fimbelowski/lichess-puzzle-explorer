export default function openDatabase(name: string, version?: number): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open(name, version);

    request.onerror = (event) => {
      const target = event.target as IDBOpenDBRequest;
      reject(target.error);
    };

    request.onsuccess = (event) => {
      const target = event.target as IDBOpenDBRequest;
      resolve(target.result);
    };

    request.onupgradeneeded = (event) => {
      const target = event.target as IDBOpenDBRequest;
      resolve(target.result);
    };
  });
}
