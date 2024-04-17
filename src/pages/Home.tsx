import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Categories } from '../components/Categories';
import { Sort, sortList } from '../components/Sort';
import { PizzaBlock } from '../components/PizzaBlock';
import { Skeleton } from '../components/PizzaBlock/Sceleton';
import { selectFilter, setCategoryId, setFilters } from '../redux/slices/filterSlice';
import { useSearchParams } from 'react-router-dom';
import { fetchPizzasData, selectPizza } from '../redux/slices/pizzaSlice';
import { IPizzaData } from '../components/interface/base-interface';

export const Home = () => {
  const dispatch = useDispatch();
  const { categoryId, order: sortingOrder, sort, searchValue } = useSelector(selectFilter);
  const sortType = sort.sortProperty;
  const { items, status } = useSelector(selectPizza);

  const [searchParams, setSearchParams] = useSearchParams();

  const isMounted = React.useRef(false);

  const onChangeCategory = (idx: number) => {
    dispatch(setCategoryId(idx));
  };

  const fetchPizzas = async () => {
    const apiUrl = 'https://642ed4682b883abc64182eca.mockapi.io/items?';
    //const apiUrl = 'https://6dbb47678b443279.mokky.ru/items?';
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const sort = `&sortBy=${sortType}`;
    const order = sortingOrder ? '&order=desc' : '&order=asc';
    const search = searchValue ? `&title=${searchValue}` : '';

    dispatch(
      //@ts-ignore
      fetchPizzasData({
        apiUrl,
        category,
        sort,
        order,
        search,
      }),
    );
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

  const pizzas = items.map((obj: IPizzaData) => <PizzaBlock key={obj.id} {...obj} />);

  const skeleton = [...new Array(8)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>Произошла ошибка. 😕</h2>
          <p>К сожалению, пиццы не найдены. Попробуйте повторить попытку позже.</p>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? skeleton : pizzas}</div>
      )}
    </div>
  );
};
