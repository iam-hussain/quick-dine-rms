import { StoreAdditionalType } from "@/types";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface ActionState {
  store: any;
  additional: StoreAdditionalType;
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
        additional: {
          table: [],
          tax: [],
          discounts: [],
          delivery: { value: 0, type: "VALUE" },
          packing: { value: 0, type: "VALUE" },
        },
        tags: [],
        products: [],
        categories: [],
        setStoreData: ({ additional, ...store }) =>
          set((e) => ({ ...e, store, additional })),
        setTagsData: (tags) => set((e) => ({ ...e, tags })),
      }),
      {
        name: "store-storage",
      }
    )
  )
);
