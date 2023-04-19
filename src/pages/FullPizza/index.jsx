import axios from 'axios';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import styles from './FullPizza.module.scss';

export const FullPizza = () => {
  const [pizza, setPizza] = React.useState();
  const { id } = useParams();
  const navigate = useNavigate();
  const url = 'https://642ed4682b883abc64182eca.mockapi.io/items/';

  React.useEffect(() => {
    async function fetchPuzza() {
      try {
        const { data } = await axios.get(url + id);
        setPizza(data);
      } catch (error) {
        alert('Пицца не найдена.');
        navigate('/');
      }
    }

    fetchPuzza();
    // eslint-disable-next-line
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!pizza) {
    return 'Loading...';
  }

  return (
    <div className="container">
      <div className={styles.root}>
        <img src={pizza.imageUrl} alt="Pizza" />
        <div className={styles.wrapper}>
          <h2>{pizza.title}</h2>
          <p>{pizza.description}</p>
          <h4>Цена: {pizza.price} ₽</h4>
        </div>
      </div>
    </div>
  );
};
