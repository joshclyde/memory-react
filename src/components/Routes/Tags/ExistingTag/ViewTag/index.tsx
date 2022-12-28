import { useState } from "react";
import { HiOutlineDocument, HiOutlineTag, HiPencil, HiTrash } from "react-icons/hi";

import { Button } from "src/components/Design/Button";
import {
  ActionsIconButton,
  ActionsView,
  BodyView,
  WholeView,
} from "src/components/Design/LayoutRight";
import { useAppDispatch, useAppSelector } from "src/store";
import { useTagFlashcardsCount } from "src/store/selectors";
import { deleteTag } from "src/store/tagsSlice";
import { StateTag } from "src/store/types";

export const ViewTag = ({
  tagId,
  tag,
  toggleView,
}: {
  tagId: string;
  tag: StateTag;
  toggleView: () => void;
}) => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const dispatch = useAppDispatch();
  const pending = useAppSelector((state) => state.tags.deletePending[tagId]);

  const flashcardsCount = useTagFlashcardsCount(tagId);

  const deleteFn = async () => {
    await dispatch(deleteTag(tagId));
  };

  const renderBody = () => {
    if (!confirmDelete) {
      return (
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-[4px] text-lg">
            <HiOutlineTag />
            {tag.name}
          </div>
          <div className="flex items-center gap-[4px]">
            <HiOutlineDocument />
            {flashcardsCount} {flashcardsCount === 1 ? `flashcard` : `flashcards`}
          </div>
        </div>
      );
    }

    if (confirmDelete && pending === `PENDING`) {
      return <div>Deletion in progress...</div>;
    }

    if (confirmDelete && pending === `SUCCESS`) {
      return <div>Tag successfully deleted.</div>;
    }

    if (confirmDelete && pending === `ERROR`) {
      return <div>Failed to delete tag.</div>;
    }

    if (confirmDelete) {
      return (
        <div>
          Are you sure you want to delete the tag {tag.name}?
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
          <ActionsIconButton
            title="Edit Tag"
            onClick={() => toggleView()}
            Icon={HiPencil}
          />
          <ActionsIconButton
            title="Delete Tag"
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
