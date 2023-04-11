import React from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import { Categories } from '../components/Categories';
import { Sort } from '../components/Sort';
import { PizzaBlock } from '../components/PizzaBlock';
import { Skeleton } from '../components/PizzaBlock/Sceleton';
import { SearchContext } from '../App';
import { setCategoryId } from '../redux/slices/filterSlice';

export const Home = () => {
  const dispatch = useDispatch();
  const categoryId = useSelector((state) => state.filter.categoryId);
  const sortingOrder = useSelector((state) => state.filter.order);
  const sortType = useSelector((state) => state.filter.sort.sortProperty);

  const { searchValue } = React.useContext(SearchContext);
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  React.useEffect(() => {
    const apiUrl = 'https://642ed4682b883abc64182eca.mockapi.io/items?';
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const sort = `&sortBy=${sortType}`;
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
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeleton : pizzas}</div>
    </div>
  );
};
