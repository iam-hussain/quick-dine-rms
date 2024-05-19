import { StoreAdditionalType } from "@/types";
import { defaultFeatureFlags, FeatureFlagsType } from "@iam-hussain/qd-copilot";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const defaultFees = {
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
};

interface PageState {
  authenticated: boolean;
  user: any | null;
  store: any | null;
  order: any | null;
  defaultOrder: any | null;
  categories: any[];
  kitchenCategories: any[];
  products: any[];
  featureFlags: FeatureFlagsType;
  settings: StoreAdditionalType;
}

const initialState: PageState = {
  authenticated: false,
  user: null,
  store: null,
  order: null,
  defaultOrder: null,
  categories: [],
  kitchenCategories: [],
  products: [],
  featureFlags: defaultFeatureFlags,
  settings: {
    tables: [],
    fees: defaultFees,
    taxes: [],
  },
};

export const pageSlice = createSlice({
  name: "base",
  initialState,
  reducers: {
    setBaseData: (state, action: PayloadAction<any>) => {
      const { tables, fees, taxes, featureFlags, ...store } =
        action.payload?.store || {};
      state.authenticated = Boolean(action.payload?.user?.id);
      state.user = action.payload?.user || null;
      state.store = store || null;
      state.order = action.payload?.order || null;
      state.defaultOrder = action.payload?.defaultOrder || null;
      state.categories = action.payload?.categories || [];
      state.kitchenCategories = action.payload?.kitchenCategories || [];
      state.products = action.payload?.products || [];
      state.settings = {
        tables: tables || [],
        fees: fees || defaultFees,
        taxes: taxes || [],
      };
      state.featureFlags = featureFlags || defaultFeatureFlags;
    },

    setUpdateOrder: (state, action: PayloadAction<any>) => {
      state.order = action.payload;
    },
  },
});

export const { setBaseData, setUpdateOrder } = pageSlice.actions;

export default pageSlice.reducer;
