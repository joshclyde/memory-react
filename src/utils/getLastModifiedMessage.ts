
const message = (num: number, time: string) => {
  return `${num}${time}`;
};

export const getLastModifiedMessage = (lastModifiedDate: Date) => {
  const now = new Date(Date.now());
  const seconds = (now.getTime() - lastModifiedDate.getTime()) / 1000;

  if (seconds < 60) {
    return message(Math.round(seconds), `s`);
  }
  if (seconds < 60 * 60) {
    return message(Math.round(seconds / 60), `m`);
  }
  if (seconds < 60 * 60 * 24) {
    return message(Math.round(seconds / (60 * 60)), `h`);
  }
  if (seconds < 60 * 60 * 24 * 7) {
    return message(Math.round(seconds / (60 * 60 * 24)), `d`);
  }
  if (seconds < 60 * 60 * 24 * 31) {
    return message(Math.round(seconds / (60 * 60 * 24 * 7)), `w`);
  }
  return message(
    now.getMonth() -
      lastModifiedDate.getMonth() +
      (now.getFullYear() - lastModifiedDate.getFullYear()) * 12,
    `M`,
  );
};
