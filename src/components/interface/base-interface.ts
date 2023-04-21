export interface IPizzaData {
  id: string;
  imageUrl: string;
  title: string;
  types: number[];
  sizes: number[];
  price: number;
  category: number;
  rating: number;
  description: string;
}

export interface ICart {
  count: number;
  id: string;
  imageUrl: string;
  price: number;
  size: number;
  title: string;
  type: string;
}

export type TSortListItem = {
  name: string;
  sortProperty: 'rating' | 'title' | 'price';
};

export type TCategoriesProps = {
  value: number;
  onChangeCategory: (idx: number) => void;
};
