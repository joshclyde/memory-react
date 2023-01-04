import { useCallback, useState } from "react";
import {
  HiArrowRight,
  HiEye,
  HiOutlineChevronLeft,
  HiThumbDown,
  HiThumbUp,
} from "react-icons/hi";
import { useParams } from "react-router-dom";

import {
  TopBar,
  TopBarIconButton,
  TopBarIconLink,
} from "src/components/Design/LayoutLeft";
import { BodyView } from "src/components/Design/LayoutRight";
import { Markdown } from "src/components/Markdown";
import { useAppDispatch } from "src/store";
import { createReview } from "src/store/reviewsSlice";
import { useFlashcardsArrayFromTag, useTag } from "src/store/selectors";

const LearnReal = ({ tagId }: { tagId: string }) => {
  const tag = useTag(tagId);
  const flashcards = useFlashcardsArrayFromTag(tagId);

  const [index, setIndex] = useState(Math.floor(Math.random() * flashcards.length));
  const memory = flashcards[index];

  const [expand, setExpand] = useState(false);
  const dispatch = useAppDispatch();

  const next = useCallback(() => {
    setIndex(Math.floor(Math.random() * flashcards.length));
    setExpand(false);
  }, [flashcards]);

  let content = `${memory.front}`;

  if (expand) {
    content = `${content}

---

${expand && memory.back}
`;
  }

  return (
    <>
      <TopBar
        className="md:border-none"
        title={`Learning - ${tag.name}`}
        left={<TopBarIconLink to={`/tags/${tagId}`} Icon={HiOutlineChevronLeft} />}
      />
      <BodyView className="whitespace-pre-line flex flex-col justify-center items-center">
        <Markdown className="w-[1024px]">{content}</Markdown>
        <div className="mt-8">
          {!expand && (
            <TopBarIconButton
              title="Show answer"
              onClick={() => setExpand(true)}
              Icon={HiEye}
            />
          )}
          {expand && (
            <>
              <TopBarIconButton
                className="mr-12"
                title="Bad"
                onClick={() => {
                  dispatch(
                    createReview({
                      data: { result: `BAD`, memoryId: memory.id },
                    }),
                  );
                  next();
                }}
                Icon={HiThumbDown}
              />
              <TopBarIconButton
                className="mr-12"
                title="Next flashcard"
                onClick={next}
                Icon={HiArrowRight}
              />
              <TopBarIconButton
                title="Good"
                onClick={() => {
                  dispatch(
                    createReview({
                      data: { result: `GOOD`, memoryId: memory.id },
                    }),
                  );
                  next();
                }}
                Icon={HiThumbUp}
              />
            </>
          )}
        </div>
      </BodyView>
    </>
  );
};

export const Learn = () => {
  const { tagId } = useParams();

  if (tagId == null) {
    return <div>Where is the tag id?</div>;
  }

  return <LearnReal tagId={tagId} />;
};
