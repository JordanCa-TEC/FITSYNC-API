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
      state.products = action.payload;
    },
    addToCart: (state, action) => {
      state.cart.push(action.payload);
      state.totalPrice += action.payload.price;
    },
    removeFromCart: (state, action) => {
      const index = state.cart.findIndex((p) => p.id === action.payload);
      if (index !== -1) {
        state.totalPrice -= state.cart[index].price;
        state.cart.splice(index, 1);
      }
    },
    toggleCart: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },
  },
});

export const { setProducts, addToCart, removeFromCart, toggleCart } = shopSlice.actions;
export default shopSlice.reducer;
