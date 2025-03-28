import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  routine: {
    Lunes: [],
    Martes: [],
    Miércoles: [],
    Jueves: [],
    Viernes: [],
    Sábado: [],
    Domingo: [],
  },
};

const exerciseSlice = createSlice({
  name: "exercises",
  initialState,
  reducers: {
    moveExercise: (state, action) => {
      const { fromDay, toDay, exercise } = action.payload;
      if (fromDay) {
        state.routine[fromDay] = state.routine[fromDay].filter(
          (ex) => ex.name !== exercise.name
        );
      }
      state.routine[toDay].push(exercise);
    },
    saveRoutine: (state, action) => {
      state.routine = action.payload;
    },
  },
});

export const { moveExercise, saveRoutine } = exerciseSlice.actions;
export default exerciseSlice.reducer;
