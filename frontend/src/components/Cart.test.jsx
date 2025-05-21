// src/components/Cart.test.js o Cart.test.jsx

import React from "react";
import { render, screen } from "@testing-library/react";
import Cart from "./Cart";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

// Middleware de Redux
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

// Función para envolver el componente con Provider y Router
const renderWithProviders = (ui, { store }) => {
  return render(
    <Provider store={store}>
      <MemoryRouter>{ui}</MemoryRouter>
    </Provider>
  );
};

describe("🛒 Cart Component", () => {
  test("no se muestra si el carrito está cerrado", () => {
    const store = mockStore({
      shop: {
        cart: [],
        isCartOpen: false,
      },
    });

    renderWithProviders(<Cart />, { store });
    expect(screen.queryByText(/Carrito de Compras/i)).not.toBeInTheDocument();
  });

  test("muestra mensaje si el carrito está abierto pero vacío", () => {
    const store = mockStore({
      shop: {
        cart: [],
        isCartOpen: true,
      },
    });

    renderWithProviders(<Cart />, { store });
    expect(screen.getByText(/El carrito está vacío/i)).toBeInTheDocument();
    expect(screen.getByText(/Carrito de Compras/i)).toBeInTheDocument();
  });

  test("muestra productos si hay ítems en el carrito", () => {
    const store = mockStore({
      shop: {
        isCartOpen: true,
        cart: [
          {
            id: 1,
            name: "Producto 1",
            price: 10,
            quantity: 2,
            image: "/img1.jpg",
          },
        ],
      },
    });

    renderWithProviders(<Cart />, { store });
    expect(screen.getByText(/Producto 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Total: s\/.20\.00/i)).toBeInTheDocument();
  });
});