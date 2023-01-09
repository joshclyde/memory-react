import { HiOutlineDocument } from "react-icons/hi";

import { Item } from "src/components/Design/LayoutLeft";
import { useTagFlashcardsCount } from "src/store/useSelectors";
import { getLastModifiedMessage } from "src/utils/getLastModifiedMessage";

export const TagItem = ({
  name,
  lastModified,
  id,
}: {
  name: string;
  lastModified: string;
  id: string;
}) => {
  const flashcardsCount = useTagFlashcardsCount(id);

  return (
    <Item to={`/tags/${id}`}>
      <div className="basis-12 shrink-0 text-purple-1">
        {getLastModifiedMessage(new Date(lastModified))}
      </div>
      <div className="flex flex-col w-full">
        <div className="text-light-2 mb-1">{name}</div>
        <div className="self-end text-green-1 text-xs flex gap-3">
          <div className="flex items-center gap-[2px]">
            <HiOutlineDocument />
            {flashcardsCount}
          </div>
        </div>
      </div>
    </Item>
  );
};
