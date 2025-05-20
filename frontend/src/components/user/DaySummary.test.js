import React from 'react';
import { render, screen } from '@testing-library/react';
import DaySummary from './DaySummary';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);

describe('DaySummary', () => {
  let store;

  beforeEach(() => {
    // Puedes agregar un estado simulado si tu componente lo necesita
    store = mockStore({
      userRoutine: {
        routine: [] // Esto depende de cómo funcione `selectRoutine`, puedes simularlo vacío si no es necesario
      }
    });
  });

  test('renderiza la fecha y el día actual', () => {
    render(
      <Provider store={store}>
        <DaySummary />
      </Provider>
    );

    const today = new Date();
    const dayName = today.toLocaleString("es-ES", { weekday: "long" });
    const dayOfMonth = today.getDate();
    const month = today.toLocaleString("es-ES", { month: "long" });

    expect(screen.getByText(new RegExp(`${dayOfMonth} de ${month}`, 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(dayName, 'i'))).toBeInTheDocument();
  });

  test('muestra al menos una imagen de rutina del día', () => {
    render(
      <Provider store={store}>
        <DaySummary />
      </Provider>
    );

    // Como es simulación y el día cambia, validamos que haya al menos 1 imagen cargada
    const images = screen.getAllByRole('img');
    expect(images.length).toBeGreaterThan(0);
  });
});
