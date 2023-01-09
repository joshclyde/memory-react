import { useState } from "react";
import { useParams } from "react-router-dom";

import { useTags } from "src/store/useSelectors";

import { DeleteTag } from "./DeleteTag";
import { EditTag } from "./EditTag";
import { ViewTag } from "./ViewTag";

export const ExistingTag = () => {
  let { tagId } = useParams();
  const tags = useTags();
  const [view, setView] = useState<"VIEW" | "EDIT" | "DELETE">(`VIEW`);

  const tag = tagId && tags[tagId];
  if (!tagId || !tag) {
    return <div>Not found</div>;
  }

  if (view === `EDIT`) {
    return <EditTag tagId={tagId} tag={tag} setView={setView} />;
  }
  if (view === `DELETE`) {
    return <DeleteTag tagId={tagId} tag={tag} setView={setView} />;
  }
  return <ViewTag tagId={tagId} tag={tag} setView={setView} />;
};

export const ResettingExistingTag = () => {
  let { tagId } = useParams();
  return <ExistingTag key={tagId} />;
};
