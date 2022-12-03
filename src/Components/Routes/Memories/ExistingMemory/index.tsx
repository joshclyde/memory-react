import { useParams } from "react-router-dom";

import { Markdown } from "src/components/Markdown";
import { useFlashcards } from "src/store/selectors";

export const ExistingMemory = () => {
  let { memoryId } = useParams();
  const flashcards = useFlashcards();
  const memory = memoryId && flashcards[memoryId];
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
