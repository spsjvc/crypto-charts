import axios from 'axios';

const fetchTopCoins = () =>
  axios.get(
    'https://min-api.cryptocompare.com/data/top/totalvol?tsym=USD&limit=20'
  );

const fetchDataForChart = (coin, interval) =>
  axios.get(
    `https://min-api.cryptocompare.com/data/histoday?fsym=${coin}&tsym=USD&limit=${interval}`
  );

const fetchLiveDataForChart = coin =>
  axios.get(
    `https://min-api.cryptocompare.com/data/histominute?fsym=${coin}&tsym=USD&limit=9`
  );

export { fetchTopCoins, fetchDataForChart, fetchLiveDataForChart };
