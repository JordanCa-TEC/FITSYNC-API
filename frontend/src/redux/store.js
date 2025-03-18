import { configureStore } from "@reduxjs/toolkit";
import shopReducer from "./shopSlice";
import trainersReducer from "./trainersSlice";
import routineReducer from "./routineSlice";
import trainersListReducer from "./SliceTrainersList";

const store = configureStore({
  reducer: {
    shop: shopReducer,
    trainers: trainersReducer,
    routine: routineReducer,
    trainersList: trainersListReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
