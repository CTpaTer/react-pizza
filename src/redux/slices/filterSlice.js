import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryId: 0,
  sort: {
    name: 'популярности',
    sortProperty: 'rating',
  },
  order: true,
};

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
    setSortingOrder(state, action) {
      state.order = action.payload;
    },
  },
});

export const { setCategoryId, setSort, setSortingOrder } = filterSlice.actions;

export default filterSlice.reducer;
