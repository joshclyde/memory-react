import { HiOutlineChevronLeft } from "react-icons/hi";

import { Button } from "src/components/Design/Button";
import { TopBar, TopBarIconButton } from "src/components/Design/LayoutLeft";
import { BodyView } from "src/components/Design/LayoutRight";
import { useAppDispatch, useAppSelector } from "src/store";
import { deleteFlashcard } from "src/store/flashcardsSlice";

export const DeleteMemory = ({
  memoryId,
  setView,
}: {
  memoryId: string;
  setView: React.Dispatch<React.SetStateAction<"EDIT" | "DELETE" | "VIEW">>;
}) => {
  const dispatch = useAppDispatch();
  const pending = useAppSelector((state) => state.flashcards.deletePending[memoryId]);

  const deleteFunction = async () => {
    await dispatch(deleteFlashcard(memoryId));
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
      <TopBar
        className="md:border-none"
        title="Delete Memory"
        left={
          <TopBarIconButton onClick={() => setView(`VIEW`)} Icon={HiOutlineChevronLeft} />
        }
      />
      <BodyView>
        Are you sure you want to delete this memory?
        <div className="mt-4">
          <Button className="w-24" type="button" onClick={() => deleteFunction()}>
            Confirm
          </Button>
          <Button className="ml-4 w-24" type="button" onClick={() => setView(`VIEW`)}>
            Cancel
          </Button>
        </div>
      </BodyView>
    </>
  );
};
