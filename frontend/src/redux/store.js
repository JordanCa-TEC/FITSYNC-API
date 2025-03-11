import { configureStore } from "@reduxjs/toolkit";
import shopReducer from "./shopSlice";
import trainersReducer from "./trainersSlice";
import routineReducer from "./routineSlice";

const store = configureStore({
  reducer: {
    shop: shopReducer,
    trainers: trainersReducer,
    routine: routineReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
