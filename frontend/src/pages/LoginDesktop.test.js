// LoginDesktop.test.jsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Login from './LoginDesktop';
import axios from 'axios';

jest.mock('axios');

describe('LoginDesktop simple tests', () => {
  test('renderiza el formulario y permite ingresar datos', () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      </MemoryRouter>
    );

    const usernameInput = screen.getByLabelText(/usuario/i);
    expect(usernameInput).toBeInTheDocument();

    const passwordInput = screen.getByLabelText(/contraseña/i);
    expect(passwordInput).toBeInTheDocument();

    fireEvent.change(usernameInput, { target: { value: 'jordan' } });
    fireEvent.change(passwordInput, { target: { value: 'correcta' } });

    expect(usernameInput.value).toBe('jordan');
    expect(passwordInput.value).toBe('correcta');
  });

  test('realiza submit y maneja login exitoso', async () => {
    axios.post.mockResolvedValueOnce({ data: { token: '12345' } });

    render(
      <MemoryRouter initialEntries={['/login']}>
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/usuario/i), { target: { value: 'jordan' } });
    fireEvent.change(screen.getByLabelText(/contraseña/i), { target: { value: 'correcta' } });

    fireEvent.click(screen.getByRole('button', { name: /aceptar/i }));

    await waitFor(() => {
      expect(screen.queryByText(/credenciales incorrectas/i)).not.toBeInTheDocument();
    });
  });
});
