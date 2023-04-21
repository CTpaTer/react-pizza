import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { IFilterSlice } from '../../components/interface/redux';
import { TSortListItem } from '../../components/interface/base-interface';

const initialState: IFilterSlice = {
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
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setSort(state, action: PayloadAction<TSortListItem>) {
      state.sort = action.payload;
    },
    setSortingOrder(state, action: PayloadAction<boolean>) {
      state.order = action.payload;
    },
    setFilters(state, action) {
      //: PayloadAction<ISetFilters>
      state.categoryId = Number(action.payload.categoryId);
      state.sort = action.payload.list;
      state.order = action.payload.sortingOrder === 'true';
    },
  },
});

export const selectFilter = (state: RootState) => state.filter;

export const { setCategoryId, setSort, setSortingOrder, setFilters, setSearchValue } =
  filterSlice.actions;

export default filterSlice.reducer;
