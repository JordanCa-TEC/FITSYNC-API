import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  routines: {},
};

export const exerciseSlice = createSlice({
  name: "exercises",
  initialState,
  reducers: {
    moveExercise: (state, action) => {
      const { weekKey, fromDay, toDay, exercise } = action.payload;

      // Si la semana no existe, la creamos con la estructura por defecto
      if (!state.routines[weekKey]) {
        state.routines[weekKey] = {
          Lunes: { exercises: [] },
          Martes: { exercises: [] },
          Miércoles: { exercises: [] },
          Jueves: { exercises: [] },
          Viernes: { exercises: [] },
          Sábado: { exercises: [] },
          Domingo: { exercises: [] },
        };
      }

      // Si viene del banco, solo agregamos al día destino
      if (fromDay === "bank") {
        state.routines[weekKey][toDay].exercises.push(exercise);
        return;
      }

      // Si es movimiento entre días
      const fromExercises = state.routines[weekKey][fromDay]?.exercises || [];
      const toExercises = state.routines[weekKey][toDay]?.exercises || [];
      
      const index = fromExercises.findIndex((ex) => ex.id === exercise.id);
      if (index !== -1) {
        // Eliminar del día origen y agregar al día destino
        state.routines[weekKey][fromDay].exercises = fromExercises.filter((ex) => ex.id !== exercise.id);
        state.routines[weekKey][toDay].exercises = [...toExercises, exercise];
      }
    },

    removeExercise: (state, action) => {
      const { weekKey, day, exerciseId } = action.payload;
      
      if (state.routines[weekKey]?.[day]) {
        state.routines[weekKey][day].exercises = 
          state.routines[weekKey][day].exercises.filter((ex) => ex.id !== exerciseId);
      }
    },

    saveRoutine: (state, action) => {
      state.routines = action.payload;
    },

    initializeWeek: (state, action) => {
      const { weekKey, baseWeekKey } = action.payload;
      
      if (!state.routines[weekKey] && state.routines[baseWeekKey]) {
        // Crear una copia profunda de la semana base
        const newWeek = JSON.parse(JSON.stringify(state.routines[baseWeekKey]));
        state.routines[weekKey] = newWeek;
      }
    },
  },
});

export const { moveExercise, removeExercise, saveRoutine, initializeWeek } = exerciseSlice.actions;
export default exerciseSlice.reducer;