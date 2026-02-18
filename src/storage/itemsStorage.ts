import AsyncStorage from "@react-native-async-storage/async-storage";
import { FilterStatus } from "@/types/FilterStatus";

const ITEM_STORAGE_KEY = "@compras:items";

export type ItemStorage = {
  id: string;
  status: FilterStatus;
  description: string;
};

async function get(): Promise<ItemStorage[]> {
  try {
    const storage = await AsyncStorage.getItem(ITEM_STORAGE_KEY);
    const items = storage ? JSON.parse(storage) : [];
    return Array.isArray(items) ? items.filter((item) => item != null) : [];
  } catch (error) {
    throw new Error("ITEMS_GET: " + error);
  }
}
async function getByStatus(status: FilterStatus): Promise<ItemStorage[]> {
  const items = await get();
  return items.filter((item) => item.status === status);
}
async function save(items: ItemStorage[]): Promise<void> {
  try {
    await AsyncStorage.setItem(ITEM_STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    throw new Error("ITEMS_SAVE: " + error);
  }
}

async function add(newItem: ItemStorage): Promise<ItemStorage[]> {
  const items = await get();
  const updateItems = [...items, newItem];
  await save(updateItems);

  return updateItems;
}

async function remove(id: string): Promise<void> {
  const items = await get();
  const updateItems = items.filter((item) => item.id !== id);
  await save(updateItems);
}

async function clear(): Promise<void> {
  try {
    await AsyncStorage.removeItem(ITEM_STORAGE_KEY);
  } catch (error) {
    throw new Error("ITEMS_CLEAR: " + error);
  }
}
async function toggleStatus(id: string): Promise<void> {
  const items = await get();
  const updateItems = items.map((item) =>
    item.id === id
      ? {
          ...item,
          status:
            item.status === FilterStatus.PENDING
              ? FilterStatus.DONE
              : FilterStatus.PENDING,
        }
      : item,
  );
  await save(updateItems);
}
export const itemsStorage = {
  get,
  getByStatus,
  add,
  remove,
  clear,
  toggleStatus,
};
