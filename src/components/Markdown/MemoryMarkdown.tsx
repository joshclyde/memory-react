import { useMemory } from "src/store/useSelectors";

import { Markdown } from ".";

export const MemoryMarkdown = ({
  memoryId,
  showBack,
}: {
  memoryId: string;
  showBack: boolean;
}) => {
  const memory = useMemory(memoryId);

  let content = `${memory.front}`;

  if (showBack) {
    content = `${memory.front}

---

${memory.back}
`;
  }

  return <Markdown className="w-full max-w-[1024px]">{content}</Markdown>;
};
