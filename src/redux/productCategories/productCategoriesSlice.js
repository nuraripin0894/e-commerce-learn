import { createSlice } from "@reduxjs/toolkit";

export const productCategoriesSlice = createSlice({
  name: "productCategories",
  initialState: {
    items: [],
    lastSet: "",
    isLoading: false,
    error: null,
  },
  reducers: {
    setCategories: (state, action) => {
      state.items = action.payload;
      state.lastSet = new Date().toISOString();
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCategories, setLoading, setError } =
  productCategoriesSlice.actions;
const { reducer: productCategoriesReducer } = productCategoriesSlice;

// export default counterSlice.reducer
export default productCategoriesReducer;
