import { defaultFeatureFlags, FeatureFlagsType } from "@iam-hussain/qd-copilot";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  CategoryType,
  OrderAPIType,
  ProductAPIType,
  SortTokensResult,
  StoreAdditionalType,
} from "@/types";

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
  order: OrderAPIType | null;
  orders: OrderAPIType[];
  token: SortTokensResult | null;
  recentOrders: OrderAPIType[];
  categories: CategoryType[];
  kitchenCategories: CategoryType[];
  products: ProductAPIType[];
  featureFlags: FeatureFlagsType;
  settings: StoreAdditionalType;
}

const initialState: PageState = {
  authenticated: false,
  user: null,
  store: null,
  order: null,
  orders: [],
  token: null,
  recentOrders: [],
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
    setBaseData: (state, { payload }: PayloadAction<any>) => {
      const { tables, fees, taxes, featureFlags, ...store } =
        payload?.store || {};
      state.authenticated = Boolean(payload?.user?.id);
      state.user = payload?.user || null;
      state.store = store || null;
      state.settings = {
        tables: tables || [],
        fees: fees || defaultFees,
        taxes: taxes || [],
      };
      state.featureFlags = featureFlags || defaultFeatureFlags;
    },

    setOrder: (state, action: PayloadAction<OrderAPIType | null>) => {
      state.order = action.payload;
    },
    setOrders: (state, action: PayloadAction<OrderAPIType[]>) => {
      state.orders = action.payload;
    },
    setRecentOrders: (state, action: PayloadAction<OrderAPIType[]>) => {
      state.recentOrders = action.payload;
    },
    setTokens: (state, action: PayloadAction<SortTokensResult | null>) => {
      state.token = action.payload;
    },
    setCategories: (state, action: PayloadAction<CategoryType[]>) => {
      state.categories = action.payload.filter(
        (e: { type: string }) => e.type === "DEFAULT"
      );
      state.kitchenCategories = action.payload.filter(
        (e: { type: string }) => e.type === "KITCHEN"
      );
    },
    setProducts: (state, action: PayloadAction<ProductAPIType[]>) => {
      state.products = action.payload;
    },
  },
});

export const {
  setBaseData,
  setOrder,
  setOrders,
  setRecentOrders,
  setTokens,
  setCategories,
  setProducts,
} = pageSlice.actions;

export default pageSlice.reducer;
