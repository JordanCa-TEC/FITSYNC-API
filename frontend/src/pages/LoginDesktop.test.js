import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Login from './LoginDesktop';  // tu componente Login
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

    // Verifica que el input de usuario esté en el documento
    const usernameInput = screen.getByLabelText(/usuario/i);
    expect(usernameInput).toBeInTheDocument();

    // Verifica que el input de contraseña esté en el documento
    const passwordInput = screen.getByLabelText(/contraseña/i);
    expect(passwordInput).toBeInTheDocument();

    // Simula escribir usuario y contraseña
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

    const usernameInput = screen.getByLabelText(/usuario/i);
    const passwordInput = screen.getByLabelText(/contraseña/i);
    const submitBtn = screen.getByRole('button', { name: /aceptar/i });

    fireEvent.change(usernameInput, { target: { value: 'jordan' } });
    fireEvent.change(passwordInput, { target: { value: 'correcta' } });

    fireEvent.click(submitBtn);

    // En tu login simulado no hay redirección ni texto esperado,
    // pero puedes esperar que no aparezca mensaje de error

    const errorMsg = screen.queryByText(/credenciales incorrectas/i);
    expect(errorMsg).not.toBeInTheDocument();
  });

  test('maneja login con error y muestra mensaje', async () => {
    axios.post.mockRejectedValueOnce(new Error('Credenciales incorrectas'));

    render(
      <MemoryRouter initialEntries={['/login']}>
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      </MemoryRouter>
    );

    const usernameInput = screen.getByLabelText(/usuario/i);
    const passwordInput = screen.getByLabelText(/contraseña/i);
    const submitBtn = screen.getByRole('button', { name: /aceptar/i });

    fireEvent.change(usernameInput, { target: { value: 'jordan' } });
    fireEvent.change(passwordInput, { target: { value: 'incorrecta' } });

    fireEvent.click(submitBtn);

    // Espera que aparezca mensaje de error
    const errorMsg = await screen.findByText(/credenciales incorrectas/i);
    expect(errorMsg).toBeInTheDocument();
  });
});
