import purchasesReducer, {
  addPurchase,
  resetPurchases,
  fetchUserPurchases,
} from "./purchasesSlice";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

jest.mock("axios");

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe("🛒 purchasesSlice", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  const initialState = {
    items: [],
    status: "idle",
    error: null,
  };

  test("debe agregar una compra correctamente", () => {
    const nuevaCompra = { id: 1, producto: "Proteína", precio: 30 };
    const state = purchasesReducer(initialState, addPurchase(nuevaCompra));

    expect(state.items).toContainEqual(nuevaCompra);
    expect(JSON.parse(localStorage.getItem("user_purchases"))).toContainEqual(nuevaCompra);
  });

  test("debe resetear las compras correctamente", () => {
    const stateConCompras = {
      items: [{ id: 1, producto: "Proteína", precio: 30 }],
      status: "succeeded",
      error: null,
    };

    const state = purchasesReducer(stateConCompras, resetPurchases());
    expect(state).toEqual(initialState);
    expect(localStorage.getItem("user_purchases")).toBe(null);
  });

  test("maneja correctamente fetchUserPurchases - fulfilled", async () => {
    const userId = "123";
    const mockCompras = [
      { id: 1, producto: "Creatina", precio: 25 },
      { id: 2, producto: "Shaker", precio: 10 },
    ];

    axios.get.mockResolvedValueOnce({ data: mockCompras });

    const store = mockStore({ purchases: initialState });
    await store.dispatch(fetchUserPurchases(userId));

    const actions = store.getActions();
    expect(actions[0].type).toBe(fetchUserPurchases.pending.type);
    expect(actions[1].type).toBe(fetchUserPurchases.fulfilled.type);
    expect(actions[1].payload).toEqual(mockCompras);
  });

  test("maneja correctamente fetchUserPurchases - rejected", async () => {
    const userId = "123";
    axios.get.mockRejectedValueOnce({ response: { data: "Error al cargar compras" } });

    const store = mockStore({ purchases: initialState });
    await store.dispatch(fetchUserPurchases(userId));

    const actions = store.getActions();
    expect(actions[0].type).toBe(fetchUserPurchases.pending.type);
    expect(actions[1].type).toBe(fetchUserPurchases.rejected.type);
    expect(actions[1].payload).toBe("Error al cargar compras");
  });
});
