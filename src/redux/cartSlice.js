import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: []
  },
  reducers: {
    // 🔹 Add product to cart
    addToCart: (state, action) => {
      const product = action.payload;

      // ✅ normalize id (_id or id)
      const productId = product.id || product._id;

      const existingItem = state.items.find(
        (item) => item.id === productId
      );

      if (existingItem) {
        existingItem.qty += 1;
      } else {
        state.items.push({
          id: productId,
          name: product.name,
          price: product.price,
          image: product.image,
          qty: 1
        });
      }
    },

    // 🔹 Remove product
    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (item) => item.id !== action.payload
      );
    },

    // 🔹 Increase quantity
    increaseQty: (state, action) => {
      const item = state.items.find(
        (item) => item.id === action.payload
      );
      if (item) item.qty += 1;
    },

    // 🔹 Decrease quantity (minimum 1)
    decreaseQty: (state, action) => {
      const item = state.items.find(
        (item) => item.id === action.payload
      );
      if (item && item.qty > 1) {
        item.qty -= 1;
      }
    },

    // 🔹 Clear cart (optional – useful after payment)
    clearCart: (state) => {
      state.items = [];
    }
  }
});

export const {
  addToCart,
  removeFromCart,
  increaseQty,
  decreaseQty,
  clearCart
} = cartSlice.actions;

export default cartSlice.reducer;
