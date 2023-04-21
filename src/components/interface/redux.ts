import { Status } from '../../redux/slices/pizzaSlice';
import { ICart, IPizzaData, TSortListItem } from './base-interface';

export interface ICartSlice {
  totalPrice: number;
  items: ICart[];
}

export interface IFilterSlice {
  searchValue: string;
  categoryId: number;
  sort: TSortListItem;
  order: boolean;
}

export interface IPizzaSlice {
  items: IPizzaData[];
  status: Status;
}

export interface ISetFilters {
  categoryId: number;
  list: TSortListItem;
  sortingOrder: 'true' | 'false';
}
