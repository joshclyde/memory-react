const message = (num: number, time: string) => {
  return `${num} ${time}${num === 1 ? `` : `s`} ago`;
};

export const getLastModifiedMessage = (lastModifiedDate: Date) => {
  const now = new Date(Date.now());
  const seconds = (now.getTime() - lastModifiedDate.getTime()) / 1000;

  if (seconds < 60) {
    return message(Math.round(seconds), `second`);
  }
  if (seconds < 60 * 60) {
    return message(Math.round(seconds / 60), `minute`);
  }
  if (seconds < 60 * 60 * 24) {
    return message(Math.round(seconds / (60 * 60)), `hour`);
  }
  if (seconds < 60 * 60 * 24 * 7) {
    return message(Math.round(seconds / (60 * 60 * 24)), `day`);
  }
  if (seconds < 60 * 60 * 24 * 7 * 31) {
    return message(Math.round(seconds / (60 * 60 * 24 * 7)), `week`);
  }
  return message(
    now.getMonth() -
      lastModifiedDate.getMonth() +
      (now.getFullYear() - lastModifiedDate.getFullYear()) * 12,
    `year`
  );
};
