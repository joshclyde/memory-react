import { useState } from "react";
import { HiPencil, HiTrash } from "react-icons/hi";

import { Button } from "src/components/Design/Button";
import {
  ActionsIconButton,
  ActionsView,
  BodyView,
  WholeView,
} from "src/components/Design/LayoutRight";
import { Markdown } from "src/components/Markdown";
import { useAppDispatch, useAppSelector } from "src/store";
import { deleteFlashcard } from "src/store/flashcardsSlice";
import { StateFlashcard } from "src/store/types";

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

  const deleteFunction = async () => {
    await dispatch(deleteFlashcard(memoryId));
  };

  const renderBody = () => {
    if (!confirmDelete) {
      return <Markdown>{content}</Markdown>;
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
            <Button type="button" onClick={() => deleteFunction()}>
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
          <ActionsIconButton
            title="Edit Memory"
            onClick={() => toggleView()}
            Icon={HiPencil}
          />
          <ActionsIconButton
            title="Delete Memory"
            onClick={() => {
              setConfirmDelete(true);
            }}
            Icon={HiTrash}
          />
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
