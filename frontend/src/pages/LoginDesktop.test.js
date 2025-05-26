// import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from './LoginDesktop';
import { BrowserRouter } from 'react-router-dom';

// Mock del ícono y la imagen
jest.mock('react-icons/fa', () => ({
  FaEye: () => <span>Mostrar</span>,
  FaEyeSlash: () => <span>Ocultar</span>,
}));
jest.mock('../assets/assets', () => ({
  logo_Alternative: 'logo.png',
}));

describe('Login Component', () => {
  let originalWarn;

  // Ocultar warnings específicos de React Router v7
  beforeAll(() => {
    originalWarn = console.warn;
    jest.spyOn(console, 'warn').mockImplementation((msg, ...args) => {
      if (typeof msg === 'string' && msg.includes('React Router Future Flag Warning')) {
        return;
      }
      originalWarn(msg, ...args);
    });
  });

  afterAll(() => {
    console.warn.mockRestore();
  });

  beforeEach(() => {
    // Limpiar localStorage y mocks antes de cada prueba
    localStorage.clear();
    jest.restoreAllMocks();
  });

  test('renderiza correctamente los campos y botones', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    expect(screen.getByLabelText(/usuario/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
    expect(screen.getByText(/aceptar/i)).toBeInTheDocument();
    expect(screen.getByText(/registrarse/i)).toBeInTheDocument();
  });

  test('permite cambiar visibilidad de la contraseña', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const toggleButton = screen.getByRole('button', { name: /mostrar/i });
    fireEvent.click(toggleButton);
    expect(screen.getByRole('button', { name: /ocultar/i })).toBeInTheDocument();
  });

  test('muestra error si el login falla', async () => {
    // Simula fetch con error
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ error: 'Credenciales inválidas' }),
      })
    );

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText(/usuario/i), { target: { value: 'jordan' } });
    fireEvent.change(screen.getByLabelText(/contraseña/i), { target: { value: 'wrongpass' } });
    fireEvent.click(screen.getByText(/aceptar/i));

    await waitFor(() => {
      expect(screen.getByText(/credenciales inválidas/i)).toBeInTheDocument();
    });
  });
});
