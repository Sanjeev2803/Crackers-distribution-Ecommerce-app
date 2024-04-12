import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch cart items for a user
export const fetchCartItems = createAsyncThunk(
  'cart/fetchCartItems',
  async (product, thunkAPI) => {
    try {
      const response = await axios.put(`http://localhost:4000/user-api/users`,product);
      return response.data.cart;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Async thunk to remove item from the cart
export const removeCartItem = createAsyncThunk(
  'cart/removeCartItem',
  async (items, thunkAPI) => {
    try {
      const res=await axios.delete(`http://localhost:4000/user-api/cart`,{ data: items });
      return res.data.cart;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    status: 'idle',
    error: null
  },
  reducers: {
    // Add item to cart
    addItemToCart(state, action) {
      state.cartItems.push(action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch cart items pending
      .addCase(fetchCartItems.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      // Fetch cart items fulfilled
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cartItems = action.payload;
      })
      // Fetch cart items rejected
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Remove cart item pending
      .addCase(removeCartItem.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      // Remove cart item fulfilled
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cartItems = action.payload
      })
      // Remove cart item rejected
      .addCase(removeCartItem.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export const { addItemToCart } = cartSlice.actions;

export default cartSlice.reducer;
