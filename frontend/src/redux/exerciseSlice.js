import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  routine: {
    Lunes: { exercises: [] },
    Martes: { exercises: [] },
    Miércoles: { exercises: [] },
    Jueves: { exercises: [] },
    Viernes: { exercises: [] },
    Sábado: { exercises: [] },
    Domingo: { exercises: [] },
  },
};

export const exerciseSlice = createSlice({
  name: "exercises",
  initialState,
  reducers: {
    moveExercise: (state, action) => {
      const { fromDay, toDay, exercise } = action.payload;
      if (!state.routine[toDay]) state.routine[toDay] = { exercises: [] };
      if (!state.routine[fromDay]) state.routine[fromDay] = { exercises: [] };

      // Evitar duplicados en el destino
      const exists = state.routine[toDay].exercises.find((ex) => ex.id === exercise.id);
      if (!exists) {
        state.routine[toDay].exercises.push(exercise);
      }

      // Remover del origen
      state.routine[fromDay].exercises = state.routine[fromDay].exercises.filter(
        (ex) => ex.id !== exercise.id
      );
    },
    removeExercise: (state, action) => {
      const { day, exerciseId } = action.payload;
      if (state.routine[day]) {
        state.routine[day].exercises = state.routine[day].exercises.filter(
          (ex) => ex.id !== exerciseId
        );
      }
    },
    saveRoutine: (state, action) => {
      state.routine = action.payload;
    },
  },
});

export const { moveExercise, removeExercise, saveRoutine } = exerciseSlice.actions;
export default exerciseSlice.reducer;
