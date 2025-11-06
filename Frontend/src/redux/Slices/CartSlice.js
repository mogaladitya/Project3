import { createSlice } from "@reduxjs/toolkit";

export const CartSlice = createSlice({
  name: "cart",
  initialState: { items: [], total: 0 },
  reducers: {
    setCart: (state, action) => {
      if (Array.isArray(action.payload)) {
        state.items = action.payload;
        state.total = action.payload.reduce((sum, item) => sum + item.price * (item.qty || 1), 0);
      } else {
        state.items = action.payload.items || [];
        state.total = action.payload.total || 0;
      }
    },
    addLocal: (state, action) => {
      state.items.push(action.payload);
      state.total = state.items.reduce((sum, item) => sum + item.price * (item.qty || 1), 0);
    },
    removeLocal: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.total = state.items.reduce((sum, item) => sum + item.price * (item.qty || 1), 0);
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
    },
    updateQtyLocal: (state, action) => {
      const { id, qty } = action.payload;
      const found = state.items.find((it) => it.id === id);
      if (found) found.qty = qty;
      state.total = state.items.reduce((sum, item) => sum + item.price * (item.qty || 1), 0);
    },
  },
});

export const { setCart, addLocal, removeLocal, clearCart, updateQtyLocal } = CartSlice.actions;
export default CartSlice.reducer;
