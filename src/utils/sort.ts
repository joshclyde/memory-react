export const sortByNumericField = (a: number, b: number) => {
  if (a > b) {
    return -1;
  } else if (a < b) {
    return 1;
  }
  return 0;
};
