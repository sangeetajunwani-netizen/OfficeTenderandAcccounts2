
import { Tender, Transaction, Category } from '../types';

const DB_NAME = 'NexusDB';
const DB_VERSION = 2; // Increment version for new store
const STORES = {
  TENDERS: 'tenders',
  TRANSACTIONS: 'transactions',
  CATEGORIES: 'categories'
};

export const initDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORES.TENDERS)) {
        db.createObjectStore(STORES.TENDERS, { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains(STORES.TRANSACTIONS)) {
        db.createObjectStore(STORES.TRANSACTIONS, { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains(STORES.CATEGORIES)) {
        db.createObjectStore(STORES.CATEGORIES, { keyPath: 'id' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const getAll = async <T>(storeName: string): Promise<T[]> => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, 'readonly');
    const store = transaction.objectStore(storeName);
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const saveItem = async <T>(storeName: string, item: T): Promise<void> => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, 'readwrite');
    const store = transaction.objectStore(storeName);
    const request = store.put(item);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};

export const deleteItem = async (storeName: string, id: string): Promise<void> => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, 'readwrite');
    const store = transaction.objectStore(storeName);
    const request = store.delete(id);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};

export const exportData = async () => {
  const tenders = await getAll<Tender>(STORES.TENDERS);
  const transactions = await getAll<Transaction>(STORES.TRANSACTIONS);
  const categories = await getAll<Category>(STORES.CATEGORIES);
  const data = JSON.stringify({ tenders, transactions, categories, timestamp: new Date().toISOString() }, null, 2);
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `nexus_backup_${new Date().toISOString().split('T')[0]}.json`;
  link.click();
  URL.revokeObjectURL(url);
};

export const importData = async (file: File): Promise<void> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        const db = await initDB();
        
        // Helper to clear and reload a store
        const reloadStore = (storeName: string, items: any[]) => {
          const tx = db.transaction(storeName, 'readwrite');
          const store = tx.objectStore(storeName);
          store.clear();
          if (items) {
            items.forEach((item: any) => store.put(item));
          }
        };

        reloadStore(STORES.TENDERS, data.tenders);
        reloadStore(STORES.TRANSACTIONS, data.transactions);
        reloadStore(STORES.CATEGORIES, data.categories);

        resolve();
      } catch (err) {
        reject(err);
      }
    };
    reader.readAsText(file);
  });
};

export { STORES };
