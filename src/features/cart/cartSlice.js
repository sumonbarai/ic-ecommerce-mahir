import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const product = state.find((item) => item.id === action.payload.id);

      if (!product) {
        state.push({
          ...action.payload,
          qty: 1,
        });
      } else {
        product.qty++;
      }
    },

    removeItem: (state, action) => {
      return state.filter((item) => item.id !== action.payload.id);
    },
    modifyQtn: (state, action) => {
      const product = state.find((item) => item.id === action.payload.id);

      product.qty = action.payload.qty;
    },

    clearCart: () => {
      return [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToCart, removeItem, modifyQtn, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
