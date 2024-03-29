import { StoreAdditionalType } from "@/types";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface ActionState {
  store: any;
  settings: StoreAdditionalType;
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
        settings: {
          tables: [],
          fees: {
            PACKING: {
              key: "PACKING",
              name: "PACKING",
              rate: 0,
              type: "VALUE",
              position: 1,
              printName: "Packing",
            },
            DELIVERY: {
              key: "DELIVERY",
              name: "DELIVERY",
              rate: 35,
              type: "VALUE",
              position: 2,
              printName: "Delivery",
            },
          },
          taxes: [],
        },
        tags: [],
        products: [],
        categories: [],
        setStoreData: ({ tables, fees, taxes, ...store }) =>
          set((e) => ({ ...e, store, settings: { tables, fees, taxes } })),
        setTagsData: (tags) => set((e) => ({ ...e, tags })),
      }),
      {
        name: "store-storage",
      }
    )
  )
);
