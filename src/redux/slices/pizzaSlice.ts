import axios from 'axios';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { RootState } from '../store';
import { IPizzaSlice } from '../../components/interface/redux';
import { IPizzaData } from '../../components/interface/base-interface';

export const fetchPizzasData = createAsyncThunk<IPizzaData[], Record<string, string>>(
  'pizza/fetchPizzasStatus',
  async (params) => {
    const { apiUrl, category, sort, order, search } = params;
    const { data } = await axios.get<IPizzaData[]>(`${apiUrl}${category}${sort}${order}${search}`);
    return data;
  },
);

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

const initialState: IPizzaSlice = {
  items: [],
  status: Status.LOADING, // loading | success | error
};

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<IPizzaData[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzasData.pending, (state) => {
        state.status = Status.LOADING;
        state.items = [];
      })
      .addCase(fetchPizzasData.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = Status.SUCCESS;
      })
      .addCase(fetchPizzasData.rejected, (state) => {
        state.status = Status.ERROR;
        state.items = [];
      });
  },
});

export const selectPizza = (state: RootState) => state.pizza;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
