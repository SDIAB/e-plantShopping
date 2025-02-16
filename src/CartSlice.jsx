
import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
        console.log("Action received in addItem:", action.payload);
        const { name, image, cost } = action.payload;
        const existingItem = state.items.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            state.items.push({ name, image, cost, quantity: 1 });
        }
        console.log("Updated cart state:", JSON.stringify(state.items, null, 2)); // Log updated cart state
    
    },

    removeItem: (state, action) => {
        state.items = state.items.filter(item => item.name !== action.payload)
    },

    updateQuantity: (state, action) => {

        const { name, quantity } = action.payload;
        const itemToUpdate = state.items.find(item => item.name === name);
        if (itemToUpdate) {
        itemToUpdate.quantity = quantity;
        }
    },

  },

});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
