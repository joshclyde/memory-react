import { useState } from "react";
import { useParams } from "react-router-dom";

import { useFlashcards } from "src/store/selectors";

import { EditMemory } from "./EditMemory";
import { ViewMemory } from "./ViewMemory";

export const ExistingMemory = () => {
  let { memoryId } = useParams();
  const flashcards = useFlashcards();
  const [edit, setEdit] = useState(false);

  const memory = memoryId && flashcards[memoryId];
  if (!memoryId || !memory) {
    return <div>Not found</div>;
  }

  return edit ? (
    <EditMemory memoryId={memoryId} memory={memory} toggleView={() => setEdit(false)} />
  ) : (
    <ViewMemory memory={memory} toggleView={() => setEdit(true)} />
  );
};

export const ResettingExistingMemory = () => {
  let { memoryId } = useParams();
  return <ExistingMemory key={memoryId} />;
};
