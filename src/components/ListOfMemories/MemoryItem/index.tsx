import { HiOutlineTag } from "react-icons/hi";

import { Item } from "src/components/Design/LayoutLeft";
import { useAppSelector } from "src/store";
import { getLastModifiedMessage } from "src/utils/getLastModifiedMessage";

export const MemoryItem = ({
  front,
  tags,
  lastModified,
  id,
}: {
  id: string;
  front: string;
  tags: Array<string>;
  lastModified: string;
}) => {
  const tagsIncludingDeleted = useAppSelector((state) => state.tags.tagsIncludingDeleted);

  return (
    <Item to={`/memories/${id}`}>
      <div className="basis-12 shrink-0 text-purple-1">
        {getLastModifiedMessage(new Date(lastModified))}
      </div>
      <div className="flex flex-col w-full">
        <div className="text-light-2 mb-1">{front}</div>
        <div className="self-end text-green-1 text-xs flex gap-3">
          {tags.map((tag) => (
            <div key={tag} className="flex items-center gap-[2px]">
              <HiOutlineTag />
              {tagsIncludingDeleted[tag].name}
            </div>
          ))}
        </div>
      </div>
    </Item>
  );
};
