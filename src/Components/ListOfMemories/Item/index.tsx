import { state } from "@Components/state";

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
  if (seconds < 60 * 60 * 24 * 7 * 31) {
    return message(Math.round(seconds / (60 * 60 * 24 * 7)), `w`);
  }
  return message(
    now.getMonth() -
      lastModifiedDate.getMonth() +
      (now.getFullYear() - lastModifiedDate.getFullYear()) * 12,
    `y`,
  );
};

export const Item = ({
  front,
  back,
  tags,
  lastModified,
}: {
  front: string;
  back: string;
  tags: Array<string>;
  lastModified: string;
}) => {
  return (
    <div className="p-4 flex">
      <div className="basis-12 shrink-0">
        {getLastModifiedMessage(new Date(lastModified))}
      </div>
      <div className="flex flex-col w-full">
        <div>{front}</div>
        <div className="self-end">
          {tags.map((tag) => state.tags.tagsIncludingDeleted[tag].name)}
        </div>
      </div>
    </div>
  );
};
