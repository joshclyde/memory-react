import React, { useState } from "react";
import { HiCheck, HiPencil, HiX } from "react-icons/hi";
import { useParams } from "react-router-dom";

import { Markdown } from "src/components/Markdown";
import { useFlashcards } from "src/store/selectors";
import { StateFlashcard } from "src/store/types";

const ActionsView = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex flex-col">{children}</div>;
};

const BodyView = ({ children }: { children: React.ReactNode }) => {
  return <div className="pr-9 flex-grow">{children}</div>;
};

const WholeView = ({ children }: { children: React.ReactNode }) => {
  return <div className="p-9 flex ">{children}</div>;
};

const EditBody = ({ memory }: { memory: StateFlashcard }) => {
  const [front, setFront] = useState(memory.front);
  const [back, setBack] = useState(memory.back);

  return (
    <>
      <textarea value={front} onChange={(event) => setFront(event.target.value)} />
      <textarea value={back} onChange={(event) => setBack(event.target.value)} />
    </>
  );
};

const ViewBody = ({ memoryId, memory }: { memoryId: string; memory: StateFlashcard }) => {
  const content = `${memory.front}
  
---

${memory.back}
`;

  return (
    <div key={memoryId} className="whitespace-pre-line">
      {content}
      {/* <Markdown>{content}</Markdown>} */}
    </div>
  );
};

export const ExistingMemory = () => {
  let { memoryId } = useParams();
  const flashcards = useFlashcards();
  const [edit, setEdit] = useState(false);

  const memory = memoryId && flashcards[memoryId];
  if (!memoryId || !memory) {
    return <div>Not found</div>;
  }

  return (
    <WholeView>
      <BodyView>
        {edit ? (
          <EditBody memory={memory} />
        ) : (
          <ViewBody memoryId={memoryId} memory={memory} />
        )}
      </BodyView>
      <ActionsView>
        <button
          title={edit ? `Cancel Changes` : `Edit Memory`}
          type="button"
          onClick={() => setEdit((localEdit) => !localEdit)}
        >
          {edit ? <HiX size="2em" /> : <HiPencil size="2em" />}
        </button>
        {edit ? (
          <button title="Save Changes" type="button" className="mt-4">
            <HiCheck size="2em" />
          </button>
        ) : null}
      </ActionsView>
    </WholeView>
  );
};

export const ResettingExistingMemory = () => {
  let { memoryId } = useParams();
  return <ExistingMemory key={memoryId} />;
};
