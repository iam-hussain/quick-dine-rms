import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface ActionState {
  store: any;
  products: any[];
  categories: any[];
  setStoreData: (store: any) => void;
}

export const useStoreStore = create<ActionState>()(
  devtools(
    persist(
      (set) => ({
        store: {},
        products: [],
        categories: [],
        setStoreData: ({ products = [], ...store }) =>
          set(() => ({ products, store })),
      }),
      {
        name: "store-storage",
      }
    )
  )
);
