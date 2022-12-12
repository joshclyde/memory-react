import { useState } from "react";
import { HiPencil, HiTrash } from "react-icons/hi";

import { Button } from "src/components/Design/Button";
import { useAppDispatch, useAppSelector } from "src/store";
import { deleteFlashcard } from "src/store/flashcardsSlice";
import { StateFlashcard } from "src/store/types";

import { ActionsView, BodyView, WholeView } from "../core";

export const ViewMemory = ({
  memoryId,
  memory,
  toggleView,
}: {
  memoryId: string;
  memory: StateFlashcard;
  toggleView: () => void;
}) => {
  const content = `${memory.front}
  
---

${memory.back}
`;

  const [confirmDelete, setConfirmDelete] = useState(false);
  const dispatch = useAppDispatch();
  const pending = useAppSelector((state) => state.flashcards.deletePending[memoryId]);

  const deleteFn = async () => {
    await dispatch(deleteFlashcard(memoryId));
  };

  const renderBody = () => {
    if (!confirmDelete) {
      return (
        <div className="whitespace-pre-line">
          {content}
          {/* <Markdown>{content}</Markdown>} */}
        </div>
      );
    }

    if (confirmDelete && pending === `PENDING`) {
      return <div>Deletion in progress...</div>;
    }

    if (confirmDelete && pending === `SUCCESS`) {
      return <div>Memory successfully deleted.</div>;
    }

    if (confirmDelete && pending === `ERROR`) {
      return <div>Failed to delete memory.</div>;
    }

    if (confirmDelete) {
      return (
        <div>
          Are you sure you want to delete this memory?
          <div className="mt-4">
            <Button type="button" onClick={() => deleteFn()}>
              Confirm
            </Button>
            <Button
              className="ml-4"
              type="button"
              onClick={() => setConfirmDelete(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      );
    }
  };

  const renderActions = () => {
    if (!confirmDelete) {
      return (
        <>
          <button title="Edit Memory" type="button" onClick={() => toggleView()}>
            <HiPencil size="2em" />
          </button>
          <button
            className="mt-4"
            title="Delete Memory"
            type="button"
            onClick={() => {
              setConfirmDelete(true);
            }}
          >
            <HiTrash size="2em" />
          </button>
        </>
      );
    }
  };

  return (
    <WholeView>
      <BodyView>{renderBody()}</BodyView>
      <ActionsView>{renderActions()}</ActionsView>
    </WholeView>
  );
};
