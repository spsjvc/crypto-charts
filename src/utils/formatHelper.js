import numeral from 'numeral';

const formatToUsd = number =>
  number === 0
    ? numeral(number).format('$0.00')
    : numeral(number).format('$0,0.00');

const formatToUsdUnderOne = number =>
  number === 0
    ? numeral(number).format('$0.00')
    : numeral(number).format('$0,0.00000');

export { formatToUsd, formatToUsdUnderOne };
