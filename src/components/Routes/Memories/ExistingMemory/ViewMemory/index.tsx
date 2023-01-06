import { HiOutlineChevronLeft, HiOutlineTrash, HiPencil } from "react-icons/hi";

import {
  TopBar,
  TopBarIconButton,
  TopBarIconLink,
} from "src/components/Design/LayoutLeft";
import { BodyView } from "src/components/Design/LayoutRight";
import { Markdown } from "src/components/Markdown";
import { MemoryTags } from "src/components/MemoryTags";
import { StateFlashcard } from "src/store/types";

export const ViewMemory = ({
  memory,
  setView,
}: {
  memory: StateFlashcard;
  setView: React.Dispatch<React.SetStateAction<"EDIT" | "DELETE" | "VIEW">>;
}) => {
  const content = `${memory.front}
  
---

${memory.back}
`;

  return (
    <>
      <TopBar
        className="md:border-none"
        title="View Memory"
        left={
          <TopBarIconLink
            className="md:hidden"
            to="/memories"
            Icon={HiOutlineChevronLeft}
          />
        }
        right={
          <>
            <TopBarIconButton
              className="mr-4"
              onClick={() => setView(`EDIT`)}
              Icon={HiPencil}
            />
            <TopBarIconButton onClick={() => setView(`DELETE`)} Icon={HiOutlineTrash} />
          </>
        }
      />
      <BodyView className="flex flex-col">
        <MemoryTags className="mb-4 self-end" tags={memory.tags} />
        <Markdown>{content}</Markdown>
      </BodyView>
    </>
  );
};
