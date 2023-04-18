import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Categories } from '../components/Categories';
import { Sort, sortList } from '../components/Sort';
import { PizzaBlock } from '../components/PizzaBlock';
import { Skeleton } from '../components/PizzaBlock/Sceleton';
import { SearchContext } from '../App';
import { setCategoryId, setFilters } from '../redux/slices/filterSlice';
import { useSearchParams } from 'react-router-dom';
import { fetchPizzasData } from '../redux/slices/pizzaSlice';

export const Home = () => {
  const dispatch = useDispatch();
  const categoryId = useSelector((state) => state.filter.categoryId);
  const sortingOrder = useSelector((state) => state.filter.order);
  const sortType = useSelector((state) => state.filter.sort.sortProperty);
  const items = useSelector((state) => state.pizza.items);

  const { searchValue } = React.useContext(SearchContext);
  const [isLoading, setIsLoading] = React.useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const fetchPizzas = async () => {
    const apiUrl = 'https://642ed4682b883abc64182eca.mockapi.io/items?';
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const sort = `&sortBy=${sortType}`;
    const order = sortingOrder ? '&order=desc' : '&order=asc';
    const search = searchValue ? `&title=${searchValue}` : '';

    try {
      setIsLoading(true);
      dispatch(
        fetchPizzasData({
          apiUrl,
          category,
          sort,
          order,
          search,
        }),
      );
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    if (window.location.search) {
      const arr = [];
      for (const entry of searchParams.entries()) {
        arr.push(entry);
      }

      const params = Object.fromEntries(arr);

      const list = sortList.find((obj) => obj.sortProperty === params.sortType);

      dispatch(
        setFilters({
          ...params,
          list,
        }),
      );
      isSearch.current = true;
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    fetchPizzas();
  }, [categoryId, sortType, sortingOrder, searchValue]); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    if (isMounted.current) {
      setSearchParams({ categoryId, sortType, sortingOrder });
    }

    isMounted.current = true;
  }, [categoryId, sortType, sortingOrder]); // eslint-disable-line react-hooks/exhaustive-deps

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
