import { openDB } from 'idb';

const DB_NAME = 'SwimMetricsDB';
const DB_VERSION = 1;
const STORE_NAME = 'swims';

export const initDB = async () => {
  const db = await openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, {
          keyPath: 'id',
          autoIncrement: true,
        });
        store.createIndex('style', 'style', { unique: false });
        store.createIndex('date', 'date', { unique: false });
      }
    },
  });
  return db;
};

export const addSwim = async (swim) => {
  const db = await initDB();
  const id = await db.add(STORE_NAME, {
    ...swim,
    createdAt: new Date().toISOString(),
  });
  return id;
};

export const getAllSwims = async () => {
  const db = await initDB();
  return await db.getAll(STORE_NAME);
};

export const getSwimsByStyle = async (style) => {
  const db = await initDB();
  const index = db.transaction(STORE_NAME).store.index('style');
  return await index.getAll(style);
};

export const updateSwim = async (id, swim) => {
  const db = await initDB();
  await db.put(STORE_NAME, { ...swim, id });
};

export const deleteSwim = async (id) => {
  const db = await initDB();
  await db.delete(STORE_NAME, id);
};

export const clearAllSwims = async () => {
  const db = await initDB();
  await db.clear(STORE_NAME);
};
