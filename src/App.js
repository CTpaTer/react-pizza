import React from 'react';
import axios from 'axios';

import './scss/app.scss';

import { Header } from './components/Header';
import { Categories } from './components/Categories';
import { Sort } from './components/Sort';
import { PizzaBlock } from './components/PizzaBlock';

function App() {
  const apiUrl = 'https://642ed4682b883abc64182eca.mockapi.io/items';

  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    try {
      axios.get(`${apiUrl}`).then((arr) => {
        setItems(arr.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {items.map((obj) => (
              <PizzaBlock key={obj.id} {...obj} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
