import shopReducer, {
  setProducts,
  addToCart,
  removeFromCart,
  clearCart,
  toggleCart,
} from "./shopSlice";

describe("🛒 shopSlice", () => {
  const initialState = {
    products: [],
    cart: [],
    totalPrice: 0,
    isCartOpen: false,
  };

  const mockProduct = { id: 1, name: "Producto 1", price: 10 };

  test("debe retornar el estado inicial", () => {
    expect(shopReducer(undefined, { type: undefined })).toEqual(initialState);
  });

  test("debe manejar setProducts", () => {
    const productos = [mockProduct];
    const action = setProducts(productos);
    const state = shopReducer(initialState, action);
    expect(state.products).toEqual(productos);
  });

  test("debe manejar addToCart (producto nuevo)", () => {
    const action = addToCart(mockProduct);
    const state = shopReducer(initialState, action);
    expect(state.cart).toHaveLength(1);
    expect(state.cart[0].quantity).toBe(1);
    expect(state.totalPrice).toBe(10);
  });

  test("debe manejar addToCart (producto existente)", () => {
    const prevState = {
      ...initialState,
      cart: [{ ...mockProduct, quantity: 1 }],
      totalPrice: 10,
    };
    const action = addToCart(mockProduct);
    const state = shopReducer(prevState, action);
    expect(state.cart[0].quantity).toBe(2);
    expect(state.totalPrice).toBe(20);
  });

  test("debe manejar removeFromCart (reducir cantidad)", () => {
    const prevState = {
      ...initialState,
      cart: [{ ...mockProduct, quantity: 2 }],
      totalPrice: 20,
    };
    const action = removeFromCart(mockProduct.id);
    const state = shopReducer(prevState, action);
    expect(state.cart[0].quantity).toBe(1);
    expect(state.totalPrice).toBe(10);
  });

  test("debe manejar removeFromCart (eliminar producto)", () => {
    const prevState = {
      ...initialState,
      cart: [{ ...mockProduct, quantity: 1 }],
      totalPrice: 10,
    };
    const action = removeFromCart(mockProduct.id);
    const state = shopReducer(prevState, action);
    expect(state.cart).toHaveLength(0);
    expect(state.totalPrice).toBe(0);
  });

  test("debe manejar clearCart", () => {
    const prevState = {
      ...initialState,
      cart: [{ ...mockProduct, quantity: 3 }],
      totalPrice: 30,
    };
    const action = clearCart();
    const state = shopReducer(prevState, action);
    expect(state.cart).toEqual([]);
    expect(state.totalPrice).toBe(0);
  });

  test("debe manejar toggleCart", () => {
    const action = toggleCart();
    const state = shopReducer(initialState, action);
    expect(state.isCartOpen).toBe(true);
  });
});
