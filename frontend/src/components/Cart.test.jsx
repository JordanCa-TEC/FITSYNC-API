import React from "react";
import { render, screen } from "@testing-library/react";
import Cart from "./Cart";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

// Crea un store de prueba
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const renderWithProviders = (store) => {
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={["/"]}>
        <Cart />
      </MemoryRouter>
    </Provider>
  );
};

describe("Cart Component", () => {
  test("no se muestra si el carrito está cerrado", () => {
    const store = mockStore({
      shop: {
        cart: [],
        isCartOpen: false,
      },
    });

    renderWithProviders(store);
    expect(screen.queryByText("Carrito de Compras")).not.toBeInTheDocument();
  });

  test("muestra mensaje si el carrito está abierto pero vacío", () => {
    const store = mockStore({
      shop: {
        cart: [],
        isCartOpen: true,
      },
    });

    renderWithProviders(store);
    expect(screen.getByText("El carrito está vacío")).toBeInTheDocument();
    expect(screen.getByText("Carrito de Compras")).toBeInTheDocument();
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

    renderWithProviders(store);
    expect(screen.getByText("Producto 1")).toBeInTheDocument();
    expect(screen.getByText("Total: s/.20.00")).toBeInTheDocument();
  });
});
