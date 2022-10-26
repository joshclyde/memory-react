import { useParams } from "react-router-dom";

import { Markdown } from "src/components/Markdown";
import { state } from "src/components/state";

export const ExistingMemory = () => {
  let { memoryId } = useParams();
  const memory = memoryId && state.flashcards.flashcardsIncludingDeleted[memoryId];
  if (!memory) {
    return <div>Not found</div>;
  }

  const content = `${memory.front}

---

${memory.back}
`;

  return (
    <div className="whitespace-pre-line p-9">
      <Markdown>{content}</Markdown>
    </div>
  );
};
