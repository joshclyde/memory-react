import { HiOutlineTag } from "react-icons/hi";

import { useAppSelector } from "src/store";

const message = (num: number, time: string) => {
  return `${num}${time}`;
};

const getLastModifiedMessage = (lastModifiedDate: Date) => {
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

export const Item = ({
  name,
  lastModified,
  isActive,
}: {
  name: string;
  lastModified: string;
  isActive: boolean;
}) => {
  return (
    <div className={`p-4 flex ${isActive ? `border-l-4 border-purple-1` : `ml-[4px]`}`}>
      <div className="basis-12 shrink-0 text-purple-1">
        {getLastModifiedMessage(new Date(lastModified))}
      </div>
      <div className="flex flex-col w-full">
        <div className="text-light-2 mb-1">{name}</div>
      </div>
    </div>
  );
};
