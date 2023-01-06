import { HiOutlineTag } from "react-icons/hi";
import { NavLink } from "react-router-dom";

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

export const MemoryTagsLinks = ({
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
        <NavLink
          key={tag}
          className="flex items-center gap-[2px] underline"
          to={`/tags/${tag}`}
        >
          <HiOutlineTag />
          {tagsIncludingDeleted[tag].name}
        </NavLink>
      ))}
    </div>
  );
};
