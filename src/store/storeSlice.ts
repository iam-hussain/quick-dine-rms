import { StoreAdditionalType } from "@/types";
import { defaultFeatureFlags, FeatureFlagsType } from "@iam-hussain/qd-copilot";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface ActionState {
  store: any;
  settings: StoreAdditionalType;
  tags: any[];
  products: any[];
  categories: any[];
  featureFlags: FeatureFlagsType;
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
              type: "VALUE" as any,
              position: 1,
              printName: "Packing",
            },
            DELIVERY: {
              key: "DELIVERY",
              name: "DELIVERY",
              rate: 35,
              type: "VALUE" as any,
              position: 2,
              printName: "Delivery",
            },
          },
          taxes: [],
        },
        tags: [],
        products: [],
        categories: [],
        featureFlags: defaultFeatureFlags,
        setStoreData: ({ tables, fees, taxes, featureFlags, ...store }) =>
          set((e) => ({
            ...e,
            store,
            featureFlags,
            settings: { tables, fees, taxes },
          })),
        setTagsData: (tags) => set((e) => ({ ...e, tags })),
      }),
      {
        name: "store-storage",
      }
    )
  )
);
