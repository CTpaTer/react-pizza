import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setSort, setSortingOrder } from '../redux/slices/filterSlice';

export const sortList = [
  { name: 'популярности', sortProperty: 'rating' },
  { name: 'цене', sortProperty: 'price' },
  { name: 'алфавиту', sortProperty: 'title' },
];

export function Sort() {
  const dispatch = useDispatch();
  const { order: sortOrder, sort } = useSelector((state) => state.filter);

  const [open, setOpen] = React.useState(false);
  const sortRef = React.useRef();

  const onClickList = (index) => {
    dispatch(setSort(index));
    setOpen(false);
  };

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.composedPath().includes(sortRef.current)) {
        setOpen(false);
      }
    };

    document.body.addEventListener('click', handleClickOutside);

    return () => document.body.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <b>Сортировка по:</b>
        <span onClick={() => setOpen(!open)}>{sort.name}</span>
        <svg
          onClick={() => dispatch(setSortingOrder(!sortOrder))}
          transform={sortOrder ? 'rotate(-180 0 0)' : ''}
          width="15"
          height="10"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
      </div>
      {open && (
        <div className="sort__popup">
          <ul>
            {sortList.map((obj, index) => {
              return (
                <li
                  key={index}
                  onClick={() => onClickList(obj)}
                  className={sort.name === obj.name ? 'active' : ''}>
                  {obj.name}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
