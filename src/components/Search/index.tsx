import React from 'react';
// import debounce from 'lodash.debounce';

import styles from './Search.module.scss';
import { useDispatch } from 'react-redux';
import { setSearchValue } from '../../redux/slices/filterSlice';

export const Search: React.FC = () => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState('');
  const inputRef = React.useRef<HTMLInputElement>(null);

  // const debounce = <F extends (...params: any[]) => void>(fn: F, delay: number) => {
  //   let timeoutID: number;
  //   return function (this: any, ...args: any[]) {
  //     clearTimeout(timeoutID);
  //     timeoutID = window.setTimeout(() => fn.apply(this, args), delay);
  //   } as F;
  // };

  const debounce = <F extends (...args: Parameters<F>) => ReturnType<F>>(
    func: F,
    waitFor: number,
  ) => {
    let timeout: NodeJS.Timeout;

    const debounced = (...args: Parameters<F>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), waitFor);
    };

    return debounced;
  };

  const onClickClear = () => {
    dispatch(setSearchValue(''));
    setValue('');
    inputRef.current?.focus();
  };

  // const updateSearchValue = React.useCallback(
  //   debounce((str) => {
  //     dispatch(setSearchValue(str));
  //   }, 1000),
  //   [],
  // );

  const updateSearchValue = React.useMemo(
    () =>
      debounce((str: string) => {
        dispatch(setSearchValue(str));
      }, 1000),
    [dispatch],
  );

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  return (
    <div className={styles.root}>
      <svg className={styles.icon} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <title />
        <g data-name="Layer 2" id="Layer_2">
          <path d="M18,10a8,8,0,1,0-3.1,6.31l6.4,6.4,1.41-1.41-6.4-6.4A8,8,0,0,0,18,10Zm-8,6a6,6,0,1,1,6-6A6,6,0,0,1,10,16Z" />
        </g>
      </svg>
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        className={styles.input}
        placeholder="Поиск пиццы ..."
      />
      {value && (
        <svg
          onClick={onClickClear}
          className={styles.clearIcon}
          height="28"
          viewBox="0 0 48 48"
          width="28"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M38 12.83l-2.83-2.83-11.17 11.17-11.17-11.17-2.83 2.83 11.17 11.17-11.17 11.17 2.83 2.83 11.17-11.17 11.17 11.17 2.83-2.83-11.17-11.17z" />
          <path d="M0 0h48v48h-48z" fill="none" />
        </svg>
      )}
    </div>
  );
};
