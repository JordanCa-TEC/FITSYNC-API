import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  cart: [],
  totalPrice: 0,
  isCartOpen: false,
};

const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      console.log("Productos recibidos en Redux:", action.payload);
      state.products = action.payload;
    },
    addToCart: (state, action) => {
      const product = action.payload;
      const existingProduct = state.cart.find((p) => p.id === product.id);

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.cart.push({ ...product, quantity: 1 });
      }

      state.totalPrice = state.cart.reduce((total, p) => total + p.price * p.quantity, 0);
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      const existingProduct = state.cart.find((p) => p.id === productId);

      if (existingProduct) {
        if (existingProduct.quantity > 1) {
          existingProduct.quantity -= 1;
        } else {
          state.cart = state.cart.filter((p) => p.id !== productId);
        }
      }

      state.totalPrice = state.cart.reduce((total, p) => total + p.price * p.quantity, 0);
    },
    clearCart: (state) => {
      state.cart = [];
      state.totalPrice = 0;
    },
    toggleCart: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },
  },
});

export const { setProducts, addToCart, removeFromCart, clearCart, toggleCart } = shopSlice.actions;
export default shopSlice.reducer;
