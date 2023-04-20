import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchValue: '',
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
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
    setSortingOrder(state, action) {
      state.order = action.payload;
    },
    setFilters(state, action) {
      state.categoryId = Number(action.payload.categoryId);
      state.sort = action.payload.list;
      state.order = action.payload.sortingOrder === 'true';
    },
  },
});

export const selectFilter = (state) => state.filter;

export const { setCategoryId, setSort, setSortingOrder, setFilters, setSearchValue } =
  filterSlice.actions;

export default filterSlice.reducer;
