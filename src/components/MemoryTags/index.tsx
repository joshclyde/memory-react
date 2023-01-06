import { HiOutlineTag } from "react-icons/hi";

import { useAppSelector } from "src/store";

export const MemoryTags = ({
  tags,
  className,
}: {
  tags: Array<string>;
  className?: string;
}) => {
  const tagsIncludingDeleted = useAppSelector((state) => state.tags.tagsIncludingDeleted);

  return (
    <div className={`text-green-1 text-xs flex gap-3 ${className}`}>
      {tags.map((tag) => (
        <div key={tag} className="flex items-center gap-[2px]">
          <HiOutlineTag />
          {tagsIncludingDeleted[tag].name}
        </div>
      ))}
    </div>
  );
};
