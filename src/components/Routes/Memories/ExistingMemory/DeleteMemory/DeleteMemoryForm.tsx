import { Button } from "src/components/Design/Button";
import { useAppDispatch, useAppSelector } from "src/store";
import { deleteFlashcard } from "src/store/flashcardsSlice";

// TODO: make this an actual form
export const DeleteMemoryForm = ({
  memoryId,
  onCancel,
  onSuccessfulDelete,
}: {
  memoryId: string;
  onCancel: () => void;
  onSuccessfulDelete?: () => void;
}) => {
  const dispatch = useAppDispatch();
  const pending = useAppSelector((state) => state.flashcards.deletePending[memoryId]);

  const deleteFunction = async () => {
    await dispatch(deleteFlashcard(memoryId));
    onSuccessfulDelete?.();
  };

  if (pending === `PENDING`) {
    return <div>Deletion in progress...</div>;
  }

  if (pending === `SUCCESS`) {
    return <div>Memory successfully deleted.</div>;
  }

  if (pending === `ERROR`) {
    return <div>Failed to delete memory.</div>;
  }

  return (
    <>
      <p>Are you sure you want to delete this memory?</p>
      <div className="mt-4">
        <Button className="w-24" type="button" onClick={() => deleteFunction()}>
          Confirm
        </Button>
        <Button className="ml-4 w-24" type="button" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </>
  );
};
