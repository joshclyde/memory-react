import { useCallback, useState } from "react";
import { HiArrowRight, HiEye, HiThumbDown, HiThumbUp } from "react-icons/hi";
import { useParams } from "react-router-dom";

import {
  ActionsIconButton,
  ActionsView,
  BodyView,
  WholeView,
} from "src/components/Design/LayoutRight";
import { useAppDispatch } from "src/store";
import { createReview } from "src/store/reviewsSlice";
import { useFlashcardsArrayFromTag } from "src/store/selectors";

const LearnReal = ({ tagId }: { tagId: string }) => {
  const flashcards = useFlashcardsArrayFromTag(tagId);

  const [current, setCurrent] = useState(0);
  const [expand, setExpand] = useState(false);
  const dispatch = useAppDispatch();

  const next = useCallback(() => {
    setCurrent((x) => x + 1);
    setExpand(false);
  }, []);

  if (current >= flashcards.length) {
    return <div>All done!</div>;
  }

  const currentFlashcard = flashcards[current];

  let content = `${current + 1} / ${flashcards.length}

  


  ${currentFlashcard.front}`;

  if (expand) {
    content = `${content}

---

${expand && currentFlashcard.back}
    `;
  }

  return (
    <WholeView>
      <BodyView className="whitespace-pre-line">{content}</BodyView>
      <ActionsView>
        {!expand && (
          <ActionsIconButton
            title="Show answer"
            onClick={() => setExpand(true)}
            Icon={HiEye}
          />
        )}
        {expand && (
          <>
            <ActionsIconButton
              title="Next flashcard"
              onClick={next}
              Icon={HiArrowRight}
            />
            <ActionsIconButton
              title="Good"
              onClick={() => {
                dispatch(
                  createReview({
                    data: { result: `GOOD`, memoryId: currentFlashcard.id },
                  }),
                );
                next();
              }}
              Icon={HiThumbUp}
            />
            <ActionsIconButton
              title="Bad"
              onClick={() => {
                dispatch(
                  createReview({
                    data: { result: `BAD`, memoryId: currentFlashcard.id },
                  }),
                );
                next();
              }}
              Icon={HiThumbDown}
            />
          </>
        )}
      </ActionsView>
    </WholeView>
  );
};

export const Learn = () => {
  const { tagId } = useParams();

  if (tagId == null) {
    return <div>Where is the tag id</div>;
  }

  return <LearnReal tagId={tagId} />;
};
