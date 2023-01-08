import {
  HiOutlineChevronLeft,
  HiOutlineDocument,
  HiOutlineTag,
  HiOutlineTrash,
  HiPencil,
} from "react-icons/hi";

import {
  TopBar,
  TopBarIconButton,
  TopBarIconLink,
} from "src/components/Design/LayoutLeft";
import { BodyView } from "src/components/Design/LayoutRight";
import { Link } from "src/components/Design/Link";
import { useFlashcardsArrayFromTag, useReviewsArray } from "src/store/selectors";
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
  setView,
}: {
  tagId: string;
  tag: StateTag;
  setView: React.Dispatch<React.SetStateAction<"EDIT" | "DELETE" | "VIEW">>;
}) => {
  const data = useLocal(tagId);

  return (
    <>
      <TopBar
        className="md:border-none"
        title="View Tag"
        left={
          <TopBarIconLink className="md:hidden" to="/tags" Icon={HiOutlineChevronLeft} />
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
      <BodyView>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-[4px] text-lg">
            <HiOutlineTag className="text-purple-1" />
            {tag.name}
          </div>
          <div className="flex items-center gap-[4px]">
            <HiOutlineDocument className="text-purple-1" />
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
          <Link to={`/learn/${tagId}`} className="w-fit">
            Learn
          </Link>
        </div>
      </BodyView>
    </>
  );
};
