import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter/counterSlice";
import productsReducer from "./products/productsSlice";

export default configureStore({
  reducer: {
    counter: counterReducer,
    product: productsReducer,
  },
});
