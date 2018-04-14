import axios from 'axios';

const fetchTopCoins = () =>
  axios.get(
    'https://min-api.cryptocompare.com/data/top/totalvol?tsym=USD&limit=20'
  );

const fetchDataForChart = (coin, interval) =>
  axios.get(
    `https://min-api.cryptocompare.com/data/histoday?fsym=${coin}&tsym=USD&limit=${interval}`
  );

export { fetchTopCoins, fetchDataForChart };
