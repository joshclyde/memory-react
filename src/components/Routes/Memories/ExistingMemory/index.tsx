import { useState } from "react";
import { useParams } from "react-router-dom";

import { useFlashcards } from "src/store/selectors";

import { DeleteMemory } from "./DeleteMemory";
import { EditMemory } from "./EditMemory";
import { ViewMemory } from "./ViewMemory";

export const ExistingMemory = () => {
  let { memoryId } = useParams();
  const flashcards = useFlashcards();
  const [view, setView] = useState<"VIEW" | "EDIT" | "DELETE">(`VIEW`);

  const memory = memoryId && flashcards[memoryId];
  if (!memoryId || !memory) {
    return <div>Not found</div>;
  }

  if (view === `EDIT`) {
    return <EditMemory memoryId={memoryId} memory={memory} setView={setView} />;
  }
  if (view === `DELETE`) {
    return <DeleteMemory memoryId={memoryId} setView={setView} />;
  }
  return <ViewMemory memory={memory} setView={setView} />;
};

export const ResettingExistingMemory = () => {
  let { memoryId } = useParams();
  return <ExistingMemory key={memoryId} />;
};
