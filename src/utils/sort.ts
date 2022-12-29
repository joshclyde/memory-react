export const sortByNumericField = (a: number, b: number) => {
  if (a > b) {
    return -1;
  } else if (a < b) {
    return 1;
  }
  return 0;
};

export const sortByAlphabet = (a: string, b: string) => {
  return a.localeCompare(b);
};

export const sortByDateString = (a: string, b: string) => {
  if (new Date(a) > new Date(b)) {
    return -1;
  } else if (new Date(a) < new Date(b)) {
    return 1;
  }
  return 0;
};
