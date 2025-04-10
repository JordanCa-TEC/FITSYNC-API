import { createSlice } from "@reduxjs/toolkit";

// Función para obtener el número de semana de una fecha
function getWeekNumber(date) {
  const startDate = new Date(date.getFullYear(), 0, 1);
  const days = Math.floor((date - startDate) / (24 * 60 * 60 * 1000));
  return Math.ceil((days + 1) / 7);
}

// Obtener la fecha de la semana actual
const currentWeek = getWeekNumber(new Date());

const initialState = {
  routines: {},
  hasIconsPerWeek: {},
};

export const exerciseSlice = createSlice({
  name: "exercises",
  initialState,
  reducers: {
    // Mueve un ejercicio entre días y verifica si la semana es pasada
    moveExercise: (state, action) => {
      const { weekKey, fromDay, toDay, exercise } = action.payload;

      // Verificar si la semana es pasada
      const weekNumber = parseInt(weekKey.split('-')[1]); // Asumiendo que el weekKey es algo como 'week-1', 'week-2', etc.
      if (weekNumber < currentWeek) {
        return; // No hacer nada si la semana es pasada
      }

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

      // Obtiene las listas de ejercicios de los días
      const fromExercises = state.routines[weekKey][fromDay]?.exercises || [];
      const toExercises = state.routines[weekKey][toDay]?.exercises || [];

      // Verifica si el ejercicio ya está en el día de destino
      const isExerciseAlreadyInTargetDay = toExercises.some((ex) => ex.id === exercise.id);
      if (!isExerciseAlreadyInTargetDay) {
        // Elimina el ejercicio del día de origen
        state.routines[weekKey][fromDay].exercises = fromExercises.filter((ex) => ex.id !== exercise.id);

        // Agrega el ejercicio al día de destino
        state.routines[weekKey][toDay].exercises.push(exercise);
      }

      // No se elimina ni se duplican los iconos si no hay cambios

      // Verifica si algún día tiene iconos y actualiza el estado de hasIconsPerWeek
      const days = Object.keys(state.routines[weekKey]);
      const hasIcon = days.some((dayName) =>
        state.routines[weekKey][dayName].exercises.some((ex) => ex.hasIcon)
      );
      state.hasIconsPerWeek[weekKey] = hasIcon;
    },

    // Elimina un ejercicio
    removeExercise: (state, action) => {
      const { weekKey, day, exerciseId } = action.payload;

      // Verificar si la semana es pasada
      const weekNumber = parseInt(weekKey.split('-')[1]);
      if (weekNumber < currentWeek) {
        return; // No hacer nada si la semana es pasada
      }

      // Eliminar solo el ejercicio con el ID correspondiente
      if (state.routines[weekKey]?.[day]) {
        state.routines[weekKey][day].exercises = 
          state.routines[weekKey][day].exercises.filter((ex) => ex.id !== exerciseId);
        
        // Actualizar el estado de hasIconsPerWeek solo si no hay más iconos en la semana
        const remainingExercises = Object.values(state.routines[weekKey]).flatMap(day => day.exercises);
        const hasAnyIcon = remainingExercises.some((ex) => ex.hasIcon);

        // Si no hay iconos en la semana, eliminar la clave de hasIconsPerWeek
        if (!hasAnyIcon) {
          delete state.hasIconsPerWeek[weekKey];
        }
      }
    },

    saveRoutine: (state, action) => {
      state.routines = action.payload;
    },

    initializeWeek: (state, action) => {
      const { weekKey, baseWeekKey } = action.payload;

      const weekNumber = parseInt(weekKey.split('-')[1]);
      if (weekNumber < currentWeek) {
        return; // No permitir inicializar semanas pasadas
      }

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
      }
    },

    duplicateExercise: (state, action) => {
      const { weekKey, day, exercise } = action.payload;

      const weekNumber = parseInt(weekKey.split('-')[1]);
      if (weekNumber < currentWeek) {
        return; // No permitir duplicar ejercicios en semanas pasadas
      }

      if (state.routines[weekKey]?.[day]) {
        const isDuplicate = state.routines[weekKey][day].exercises.some((ex) => ex.id === exercise.id);

        if (!isDuplicate) {
          const newExercise = {
            ...exercise,
            id: `${exercise.id}-${Date.now()}`,
          };
          state.routines[weekKey][day].exercises.push(newExercise);
        }
      }
    },
  },
});

export const { moveExercise, removeExercise, saveRoutine, initializeWeek, duplicateExercise } = exerciseSlice.actions;
export default exerciseSlice.reducer;
