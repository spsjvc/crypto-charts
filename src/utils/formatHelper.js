import numeral from 'numeral';

const formatToUsd = number => numeral(number).format('$0,0.00');
const formatToUsdUnderOne = number => numeral(number).format('$0,0.00000');

export { formatToUsd, formatToUsdUnderOne };
