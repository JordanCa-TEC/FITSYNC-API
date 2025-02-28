import { configureStore } from "@reduxjs/toolkit";
import shopReducer from "./shopSlice"; 

const store = configureStore({
  reducer: {
    shop: shopReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export default store;