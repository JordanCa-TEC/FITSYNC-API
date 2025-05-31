// src/components/user/DaySummary.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import DaySummary from './DaySummary';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import userRoutineReducer from '../../redux/userRoutineSlice';

const renderWithStore = (ui) => {
  const store = configureStore({
    reducer: {
      userRoutine: userRoutineReducer,
    },
    preloadedState: {
      userRoutine: {
        routines: {
          lunes: ["brazo", "pecho"],
          martes: ["espalda"],
          miercoles: ["piernas", "gluteos", "brazo"],
          jueves: ["pecho", "espalda"],
          viernes: ["gluteos", "piernas"],
        },
        selectedDay: "lunes", // <- importante para evitar error en selectRoutine
      },
    },
  });

  return render(<Provider store={store}>{ui}</Provider>);
};

describe('DaySummary', () => {
  it('renderiza el título del día y los íconos correctamente', () => {
    renderWithStore(<DaySummary />);

    const today = new Date();
    const dayName = today.toLocaleString("es-ES", { weekday: "long" });
    const formattedDay = dayName.charAt(0).toUpperCase() + dayName.slice(1);

    // Verifica que se muestre el día
    expect(screen.getByText(formattedDay)).toBeInTheDocument();

    // Verifica que se rendericen imágenes según el estado simulado
    const images = screen.getAllByRole('img');
    expect(images.length).toBeGreaterThan(0);
  });
});
