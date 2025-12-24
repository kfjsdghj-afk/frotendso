import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [] },
  reducers: {
    // 🔹 Add product to cart
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.items.find(i => i.id === item.id);

      if (existItem) {
        existItem.qty += 1; // Increase qty if already in cart
      } else {
        state.items.push({ ...item, qty: 1 });
      }
    },

    // 🔹 Remove product from cart
    removeFromCart: (state, action) => {
      state.items = state.items.filter(i => i.id !== action.payload);
    },

    // 🔹 Increase quantity
    increaseQty: (state, action) => {
      const item = state.items.find(i => i.id === action.payload);
      if (item) item.qty += 1;
    },

    // 🔹 Decrease quantity
    decreaseQty: (state, action) => {
      const item = state.items.find(i => i.id === action.payload);
      if (item && item.qty > 1) item.qty -= 1;
    }
  }
});

export const { addToCart, removeFromCart, increaseQty, decreaseQty } = cartSlice.actions;
export default cartSlice.reducer;
