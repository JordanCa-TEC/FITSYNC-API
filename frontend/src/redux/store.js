import { configureStore } from "@reduxjs/toolkit";
import shopReducer from "./shopSlice"; 

const store = configureStore({
  reducer: {
    shop: shopReducer, 
  },
});

console.log("Redux Store:", store);

export default store;
