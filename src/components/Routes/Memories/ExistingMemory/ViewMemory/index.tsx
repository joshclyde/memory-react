import { HiPencil } from "react-icons/hi";

import { StateFlashcard } from "src/store/types";

import { ActionsView, BodyView, WholeView } from "../core";

export const ViewMemory = ({
  memory,
  toggleView,
}: {
  memory: StateFlashcard;
  toggleView: () => void;
}) => {
  const content = `${memory.front}
  
---

${memory.back}
`;

  return (
    <WholeView>
      <BodyView>
        <div className="whitespace-pre-line">
          {content}
          {/* <Markdown>{content}</Markdown>} */}
        </div>
      </BodyView>
      <ActionsView>
        <button title="Edit Memory" type="button" onClick={() => toggleView()}>
          <HiPencil size="2em" />
        </button>
      </ActionsView>
    </WholeView>
  );
};
