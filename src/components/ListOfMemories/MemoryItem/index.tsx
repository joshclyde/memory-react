import { Item } from "src/components/Design/LayoutLeft";
import { MemoryTags } from "src/components/MemoryTags";
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
  return (
    <Item to={`/memories/${id}`}>
      <div className="basis-12 shrink-0 text-purple-1">
        {getLastModifiedMessage(new Date(lastModified))}
      </div>
      <div className="flex flex-col w-full">
        <div className="text-light-2 mb-1">{front}</div>
        <MemoryTags className="self-end" tags={tags} />
      </div>
    </Item>
  );
};
