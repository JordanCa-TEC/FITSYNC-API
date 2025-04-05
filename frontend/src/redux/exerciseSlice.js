import { createSlice } from '@reduxjs/toolkit';

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

const exerciseSlice = createSlice({
  name: 'exercises',
  initialState,
  reducers: {
    moveExercise: (state, action) => {
      const { fromDay, toDay, exercise } = action.payload;
      
      // Remover del día origen
      if (fromDay !== 'bank' && state.routine[fromDay]) {
        state.routine[fromDay].exercises = state.routine[fromDay].exercises.filter(
          ex => ex.id !== exercise.id
        );
      }
      
      // Agregar al día destino (si no es 'bank')
      if (toDay !== 'bank' && state.routine[toDay]) {
        if (!state.routine[toDay].exercises.some(ex => ex.id === exercise.id)) {
          state.routine[toDay].exercises.push(exercise);
        }
      }
    },
    removeExercise: (state, action) => {
      const { day, exerciseId } = action.payload;
      if (state.routine[day]) {
        state.routine[day].exercises = state.routine[day].exercises.filter(
          ex => ex.id !== exerciseId
        );
      }
    },
    saveRoutine: (state, action) => {
      if (action.payload) {
        state.routine = action.payload;
      }
    },
  },
});

export const { moveExercise, saveRoutine, removeExercise } = exerciseSlice.actions;
export default exerciseSlice.reducer;