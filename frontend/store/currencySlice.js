import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "INR",
};

const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    setCurrency: (state, action) => {
      state.value = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("currency", action.payload);
      }
    },
    loadCurrency: (state, action) => {
      state.value = action.payload || "INR";
    },
  },
});

export const { setCurrency, loadCurrency } = currencySlice.actions;
export default currencySlice.reducer;
