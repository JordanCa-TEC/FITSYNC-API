// App.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// Mock de react-dnd y react-dnd-html5-backend para evitar errores ESM
jest.mock('react-dnd', () => ({
  DndProvider: ({ children }) => <>{children}</>,
}));

jest.mock('react-dnd-html5-backend', () => ({
  HTML5Backend: {},
}));

jest.mock('./routes/AppRoutes', () => () => <div>Rutas de la App</div>);

describe('App Component', () => {
  test('renderiza las rutas correctamente', () => {
    render(<App />);
    expect(screen.getByText('Rutas de la App')).toBeInTheDocument();
  });
});
