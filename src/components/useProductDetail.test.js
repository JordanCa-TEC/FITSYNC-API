const { render, screen } = require('@testing-library/react');
const ProtectedRoute = require('./ProtectedRoute').default;
const React = require('react');
const { MemoryRouter, Routes, Route } = require('react-router-dom');

// Mock para Navigate
jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');
  return {
    __esModule: true,
    ...originalModule,
    Navigate: ({ to }) => <div>Redirected to {to}</div>,
  };
});

describe('ProtectedRoute', () => {
  afterEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  test('redirige a /login si no hay usuario en localStorage', () => {
    localStorage.removeItem('user');

    render(
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route path="/protected" element={<ProtectedRoute />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Redirected to /login')).toBeInTheDocument();
  });

  test('renderiza el outlet con contexto cuando hay usuario', () => {
    const user = { role: 'admin' };
    localStorage.setItem('user', JSON.stringify(user));

    const Child = () => {
      return <div>Protected Content</div>;
    };

    render(
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route path="/protected" element={<ProtectedRoute />}>
            <Route index element={<Child />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });
});
