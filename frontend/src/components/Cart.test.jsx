// src/components/Cart.test.jsx
import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";
import shopReducer from "../redux/shopSlice";
import Cart from "./Cart";

function renderWithStore(preloadedState) {
  const store = configureStore({
    reducer: {
      shop: shopReducer,
    },
    preloadedState,
  });

  return render(
    <Provider store={store}>
      <MemoryRouter>
        <Cart />
      </MemoryRouter>
    </Provider>
  );
}

describe("🛒 Cart Component (con store real)", () => {
  test("🔒 No muestra nada si el carrito está cerrado", () => {
    renderWithStore({
      shop: {
        cart: [],
        isCartOpen: false,
      },
    });

    expect(screen.queryByText(/Carrito de Compras/i)).not.toBeInTheDocument();
  });

  test("📭 Muestra mensaje si el carrito está abierto pero vacío", () => {
    renderWithStore({
      shop: {
        cart: [],
        isCartOpen: true,
      },
    });

    expect(screen.getByText(/El carrito está vacío/i)).toBeInTheDocument();
    expect(screen.getByText(/Carrito de Compras/i)).toBeInTheDocument();
  });

  test("🧾 Muestra productos y total si hay ítems en el carrito", () => {
    renderWithStore({
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

    expect(screen.getByText(/Producto 1/i)).toBeInTheDocument();
    expect(screen.getByText(/s\/.20\.00/i)).toBeInTheDocument();
    expect(screen.getByText(/Total: s\/.20\.00/i)).toBeInTheDocument();
  });
});
