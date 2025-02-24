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
      const existingProduct = state.cart.find((p) => p.id === action.payload.id);
      if (!existingProduct) {
        state.cart.push({ ...action.payload, quantity: 1 });
        state.totalPrice += action.payload.price;
      } else {
        existingProduct.quantity += 1;
        state.totalPrice += action.payload.price;
      }
    },
    removeFromCart: (state, action) => {
      const index = state.cart.findIndex((p) => p.id === action.payload);
      if (index !== -1) {
        const removedProduct = state.cart[index];
        if (removedProduct) {
          state.totalPrice -= removedProduct.price * removedProduct.quantity;
        }
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
