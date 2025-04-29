import { createSlice } from "@reduxjs/toolkit";

// Función para obtener el número de semana de una fecha
function getWeekNumber(date) {
  const startDate = new Date(date.getFullYear(), 0, 1);
  const days = Math.floor((date - startDate) / (24 * 60 * 60 * 1000));
  return Math.ceil((days + 1) / 7);
}

// Obtener la fecha de la semana actual
const currentWeek = getWeekNumber(new Date());

// Cargar datos desde localStorage si existen
const savedRoutines = JSON.parse(localStorage.getItem("routines")) || {};
const savedIcons = JSON.parse(localStorage.getItem("hasIconsPerWeek")) || {};

const initialState = {
  routines: savedRoutines,
  hasIconsPerWeek: savedIcons,
};

export const exerciseSlice = createSlice({
  name: "exercises",
  initialState,
  reducers: {
    moveExercise: (state, action) => {
      const { weekKey, fromDay, toDay, exercise } = action.payload;

      const weekNumber = parseInt(weekKey.split("-")[1]);
      if (weekNumber < currentWeek) return;
    
      if (!state.routines[weekKey]) {
        state.routines[weekKey] = {};
      }
    
      if (!state.routines[weekKey][fromDay]) {
        state.routines[weekKey][fromDay] = { exercises: [] };
      }
    
      if (!state.routines[weekKey][toDay]) {
        state.routines[weekKey][toDay] = { exercises: [] };
      }
    
      const fromExercises = state.routines[weekKey][fromDay].exercises;
      const toExercises = state.routines[weekKey][toDay].exercises;
    
      const isExerciseAlreadyInTargetDay = toExercises.some((ex) => ex.id === exercise.id);
      if (!isExerciseAlreadyInTargetDay) {
        state.routines[weekKey][fromDay].exercises = fromExercises.filter((ex) => ex.id !== exercise.id);
        state.routines[weekKey][toDay].exercises.push(exercise);
      }
    
      const daysOfWeek = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
      const hasIcon = daysOfWeek.some((dayName) =>
        state.routines[weekKey]?.[dayName]?.exercises?.some((ex) => ex.hasIcon)
      );
      state.hasIconsPerWeek[weekKey] = hasIcon;
    
      localStorage.setItem("routines", JSON.stringify(state.routines));
      localStorage.setItem("hasIconsPerWeek", JSON.stringify(state.hasIconsPerWeek));
    },

    removeExercise: (state, action) => {
      const { weekKey, day, exerciseId } = action.payload;

      const weekNumber = parseInt(weekKey.split("-")[1]);
      if (weekNumber < currentWeek) return;

      if (state.routines[weekKey]?.[day]) {
        state.routines[weekKey][day].exercises = state.routines[weekKey][day].exercises.filter(
          (ex) => ex.id !== exerciseId
        );

        const remainingExercises = Object.values(state.routines[weekKey]).flatMap((d) => d.exercises);
        const hasAnyIcon = remainingExercises.some((ex) => ex.hasIcon);

        if (!hasAnyIcon) {
          delete state.hasIconsPerWeek[weekKey];
        }

        localStorage.setItem("routines", JSON.stringify(state.routines));
        localStorage.setItem("hasIconsPerWeek", JSON.stringify(state.hasIconsPerWeek));
      }
    },

    saveRoutine: (state, action) => {
      state.routines = action.payload;
      localStorage.setItem("routines", JSON.stringify(state.routines));
    },

    initializeWeek: (state, action) => {
      const { weekKey, baseWeekKey } = action.payload;

      const weekNumber = parseInt(weekKey.split("-")[1]);
      if (weekNumber < currentWeek) return;

      if (!state.routines[weekKey]) {
        if (state.routines[baseWeekKey]) {
          const newWeek = JSON.parse(JSON.stringify(state.routines[baseWeekKey]));
          state.routines[weekKey] = newWeek;
        } else {
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

        localStorage.setItem("routines", JSON.stringify(state.routines));
      }
    },

    duplicateExercise: (state, action) => {
      const { weekKey, day, exercise } = action.payload;

      const weekNumber = parseInt(weekKey.split("-")[1]);
      if (weekNumber < currentWeek) return;

      if (!state.routines[weekKey]?.[day]) {
        state.routines[weekKey][day] = { exercises: [] };
      }

      const isDuplicate = state.routines[weekKey][day].exercises.some((ex) => ex.id === exercise.id);
      if (!isDuplicate) {
        const newExercise = { ...exercise, id: `${exercise.id}-${Date.now()}` };
        state.routines[weekKey][day].exercises.push(newExercise);
        localStorage.setItem("routines", JSON.stringify(state.routines));
      }
    },
  },
});

export const {
  moveExercise,
  removeExercise,
  saveRoutine,
  initializeWeek,
  duplicateExercise,
} = exerciseSlice.actions;

export default exerciseSlice.reducer;
