import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PageState {
  authenticated: boolean;
  user: any | null;
  store: any | null;
  categories: any[];
  products: any[];
}

const initialState: PageState = {
  authenticated: false,
  user: null,
  store: null,
  categories: [],
  products: [],
};

export const pageSlice = createSlice({
  name: "base",
  initialState,
  reducers: {
    setBaseData: (state, action: PayloadAction<any>) => {
      state.authenticated = Boolean(action.payload?.user?.id);
      state.user = action.payload?.user || null;
      state.store = action.payload?.store || null;
      state.categories = action.payload?.categories || [];
      state.products = action.payload?.products || [];
    },
  },
});

export const { setBaseData } = pageSlice.actions;

export default pageSlice.reducer;
