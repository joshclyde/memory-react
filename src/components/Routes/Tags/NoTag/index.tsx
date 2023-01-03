import { useTagsArray } from "src/store/selectors";

export const NoTag = () => {
  const tags = useTagsArray();
  return (
    <p className="text-light-2">
      You have <span className="text-green-1">{tags.length}</span> tags
    </p>
  );
};
