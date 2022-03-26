export const numberRangeInput = ({min, max, value}) => {
  const parsedValue = parseInt(value, 10);
  if (parsedValue < min) {
    return min;
  }

  if (parsedValue > max) {
    return max;
  }

  return parsedValue ? parsedValue : 0;
};
