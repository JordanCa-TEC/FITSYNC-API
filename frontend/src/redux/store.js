import { configureStore } from "@reduxjs/toolkit";
import shopReducer from "./shopSlice";
import trainersReducer from "./trainersSlice";
import routineReducer from "./routineSlice";
import trainersListReducer from "./SliceTrainersList";
import userRoutineSlice from "./userRoutineSlice";

const store = configureStore({
  reducer: {
    shop: shopReducer,
    trainers: trainersReducer,
    routine: routineReducer,
    trainersList: trainersListReducer,
    userRoutine: userRoutineSlice,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
