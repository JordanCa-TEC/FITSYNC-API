import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  routines: {
    lunes: ["brazo", "pecho"],
    martes: ["espalda"],
    miercoles: ["piernas", "gluteos", "brazo"],
    jueves: ["pecho", "espalda"],
    viernes: ["gluteos", "piernas"],
  },
  selectedDay: "lunes",
};

const userRoutineSlice = createSlice({
  name: "userRoutine",
  initialState,
  reducers: {
    setDayRoutine: (state, action) => {
      state.selectedDay = action.payload;
    },
  },
});

export const { setDayRoutine } = userRoutineSlice.actions;
export const selectRoutine = (state) => state.userRoutine.routines[state.userRoutine.selectedDay];
export default userRoutineSlice.reducer;