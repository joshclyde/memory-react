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
import { useFlashcardsArrayFromTag, useReviewsArray } from "src/store/selectors";
import { deleteTag } from "src/store/tagsSlice";
import { StateTag } from "src/store/types";
import { sortByDateString } from "src/utils/sort";
import { suffix } from "src/utils/suffix";

const useLocal = (tagId: string) => {
  const flashcards = useFlashcardsArrayFromTag(tagId);
  let reviews = useReviewsArray();
  reviews = reviews.filter((x) => flashcards.some((y) => y.id === x.memoryId));

  return {
    flashcards,
    reviews,
    flashcardsCount: flashcards.length,
    flashcardsCountNoReviews: flashcards.filter(
      (x) => !reviews.some((y) => x.id === y.memoryId),
    ).length,
    flashcardsCountLastReviewIsGood: flashcards
      .filter((x) => reviews.some((y) => x.id === y.memoryId))
      .filter((x) => {
        return (
          reviews
            .filter((y) => y.memoryId === x.id)
            .sort((a, b) => sortByDateString(a.createdDate, b.createdDate))
            .at(-1)?.result === `GOOD`
        );
      }).length,
    flashcardsCountLastReviewIsBad: flashcards
      .filter((x) => reviews.some((y) => x.id === y.memoryId))
      .filter((x) => {
        return (
          reviews
            .filter((y) => y.memoryId === x.id)
            .sort((a, b) => sortByDateString(a.createdDate, b.createdDate))
            .at(-1)?.result === `BAD`
        );
      }).length,
  };
};

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

  const data = useLocal(tagId);

  const deleteFunction = async () => {
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
            {data.flashcardsCount}
            {` `}
            {suffix(`flashcard`, `s`, data.flashcardsCount !== 1)}
          </div>
          <div>
            {data.flashcardsCountNoReviews} new{` `}
            {suffix(`flashcard`, `s`, data.flashcardsCountNoReviews !== 1)} that have not
            been reviewed
          </div>
          <div>
            {data.flashcardsCountLastReviewIsGood}
            {` `}
            {suffix(`flashcard`, `s`, data.flashcardsCountLastReviewIsGood !== 1)} with a
            last good review
          </div>
          <div>
            {data.flashcardsCountLastReviewIsBad}
            {` `}
            {suffix(`flashcard`, `s`, data.flashcardsCountLastReviewIsBad !== 1)} with a
            last bad review
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
