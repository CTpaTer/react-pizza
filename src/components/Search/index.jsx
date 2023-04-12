import React from 'react';
// import debounce from 'lodash.debounce';

import styles from './Search.module.scss';
import { SearchContext } from '../../App';

export const Search = () => {
  const [value, setValue] = React.useState('');
  const { setSearchValue } = React.useContext(SearchContext);
  const inputRef = React.useRef();

  const debounce = (fn, wait) => {
    let timeout;
    return (...arg) => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => fn(...arg), wait);
    };
  };

  const onClickClear = () => {
    setSearchValue('');
    setValue('');
    inputRef.current.focus();
  };

  // const updateSearchValue = React.useCallback(
  //   debounce((str) => {
  //     setSearchValue(str);
  //   }, 1000),
  //   [],
  // );

  // const updateSearchValue = React.useMemo(
  //   () =>
  //     debounce((str) => {
  //       setSearchValue(str);
  //     }, 1000),
  //   [setSearchValue],
  // );

  const updateSearchValue = React.useRef(
    debounce((str) => {
      setSearchValue(str);
    }, 600),
  ).current;

  const onChangeInput = (event) => {
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
