
import { Item } from "src/components/Design/LayoutLeft";
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
  return (
    <Item to={`/tags/${id}`}>
      <div className="basis-12 shrink-0 text-purple-1">
        {getLastModifiedMessage(new Date(lastModified))}
      </div>
      <div className="flex flex-col w-full">
        <div className="text-light-2 mb-1">{name}</div>
      </div>
    </Item>
  );
};
