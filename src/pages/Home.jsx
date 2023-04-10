import React from 'react';
import axios from 'axios';

import { Categories } from '../components/Categories';
import { Sort } from '../components/Sort';
import { PizzaBlock } from '../components/PizzaBlock';
import { Skeleton } from '../components/PizzaBlock/Sceleton';
import { SearchContext } from '../App';

export const Home = () => {
  const { searchValue } = React.useContext(SearchContext);
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [categoryId, setCategoryId] = React.useState(0);
  const [sortType, setSort] = React.useState({ name: 'популярности', sortProperty: 'rating' });
  const [sortingOrder, setSortingOrder] = React.useState(true);

  React.useEffect(() => {
    const apiUrl = 'https://642ed4682b883abc64182eca.mockapi.io/items?';
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const sort = `&sortBy=${sortType.sortProperty}`;
    const order = sortingOrder ? '&order=desc' : '&order=asc';
    const search = searchValue ? `&title=${searchValue}` : '';

    try {
      setIsLoading(true);
      axios.get(`${apiUrl}${category}${sort}${order}${search}`).then((arr) => {
        setItems(arr.data);
        setIsLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
    window.scrollTo(0, 0);
  }, [categoryId, sortType, sortingOrder, searchValue]);

  // Фильтрация на статичных данных
  // const pizzas = items
  //   .filter((obj) => {
  //     if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
  //       return true;
  //     }
  //     return false;
  //   })
  //   .map((obj) => <PizzaBlock key={obj.id} {...obj} />);

  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);

  const skeleton = [...new Array(8)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={(index) => setCategoryId(index)} />
        <Sort
          value={sortType}
          onChangeSort={(index) => setSort(index)}
          sortOrder={sortingOrder}
          onChangeOrder={(index) => setSortingOrder(index)}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeleton : pizzas}</div>
    </div>
  );
};
