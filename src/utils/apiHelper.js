import axios from 'axios';

const fetchTopCoins = () =>
  axios.get(
    'https://min-api.cryptocompare.com/data/top/totalvol?tsym=USD&limit=20'
  );

const fetchDailyDataForCoin = coin =>
  axios.get(
    `https://min-api.cryptocompare.com/data/histoday?fsym=${coin}&tsym=USD&limit=10`
  );

export { fetchTopCoins, fetchDailyDataForCoin };
