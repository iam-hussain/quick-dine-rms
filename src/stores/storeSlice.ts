import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface ActionState {
  store: any;
  tags: any[];
  products: any[];
  categories: any[];
  setStoreData: (store: any) => void;
  setTagsData: (store: [any]) => void;
}

export const useStoreStore = create<ActionState>()(
  devtools(
    persist(
      (set) => ({
        store: {},
        tags: [],
        products: [],
        categories: [],
        setStoreData: (store) => set((e) => ({ ...e, store })),
        setTagsData: (tags) => set((e) => ({ ...e, tags })),
      }),
      {
        name: "store-storage",
      }
    )
  )
);
