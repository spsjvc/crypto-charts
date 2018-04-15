import numeral from 'numeral';

const formatToUsd = number => numeral(number).format('$0,0.0000');

const smartFormatToUsd = number => {
  if (number === 0) {
    return numeral(number).format('$0');
  }

  if (number <= 1) {
    return numeral(number).format('$0,0.00');
  }

  return numeral(number).format('$0a');
};

export { formatToUsd, smartFormatToUsd };
