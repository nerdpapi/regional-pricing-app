import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: null,
};

const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    setCurrency: (state, action) => {
      state.value = action.payload;
    },
    loadCurrency: (state, action) => {
      state.value = action.payload || null;
    },
    resetCurrency: (state) => {
      state.value = null;
    },
  },
});

export const { setCurrency, loadCurrency, resetCurrency } = currencySlice.actions;
export default currencySlice.reducer;
