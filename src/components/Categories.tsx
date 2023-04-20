import React from 'react';
import { TCategoriesProps } from './interface/base-interface';

export const Categories: React.FC<TCategoriesProps> = ({ value, onChangeCategory }) => {
  const categories = ['Все', 'Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Хит'];

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, index) => (
          <li
            key={categoryName}
            onClick={() => onChangeCategory(index)}
            className={value === index ? 'active' : ''}>
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
};
