export const suffix = (word: string, suffix: string, condition: boolean) => {
  return condition ? `${word}${suffix}` : word;
};
