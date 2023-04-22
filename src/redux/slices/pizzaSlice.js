import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzasData = createAsyncThunk('pizza/fetchPizzasStatus', async (params) => {
  const { apiUrl, category, sort, order, search } = params;
  const { data } = await axios.get(`${apiUrl}${category}${sort}${order}${search}`);
  return data;
});

const initialState = {
  items: [],
  status: 'loading', // loading | success | error
};

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzasData.pending, (state) => {
        state.status = 'loading';
        state.items = [];
      })
      .addCase(fetchPizzasData.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'success';
      })
      .addCase(fetchPizzasData.rejected, (state) => {
        state.status = 'error';
        state.items = [];
      });
  },
});

export const selectPizza = (state) => state.pizza;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
