import axios from 'axios';

const fetchTopCoins = () =>
  axios.get(
    'https://min-api.cryptocompare.com/data/top/totalvol?tsym=USD&limit=20'
  );

export { fetchTopCoins };
