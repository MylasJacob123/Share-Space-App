import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Products: [],
  loading: true,
  error: null,
};

export const dbSlice = createSlice({
  name: "db",
  initialState,
  reducers: {
    setLoading(state) {
      state.loading = true;
      state.error = null;
    },
    setProducts(state, action) {
      state.Products = action.payload;
      state.loading = false;
    },
    setError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    clearLoading(state) {
      state.loading = false;
    },
  },
});

export const { setLoading, setProducts, setError, clearLoading } = dbSlice.actions;

export default dbSlice.reducer;
