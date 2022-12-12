import { useState } from "react";
import { useParams } from "react-router-dom";

import { useTags } from "src/store/selectors";

import { EditTag } from "./EditTag";
import { ViewTag } from "./ViewTag";

export const ExistingTag = () => {
  let { tagId } = useParams();
  const tags = useTags();
  const [edit, setEdit] = useState(false);

  const tag = tagId && tags[tagId];
  if (!tagId || !tag) {
    return <div>Not found</div>;
  }

  return edit ? (
    <EditTag tagId={tagId} tag={tag} toggleView={() => setEdit(false)} />
  ) : (
    <ViewTag tagId={tagId} tag={tag} toggleView={() => setEdit(true)} />
  );
};

export const ResettingExistingTag = () => {
  let { tagId } = useParams();
  return <ExistingTag key={tagId} />;
};
