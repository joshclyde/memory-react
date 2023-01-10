import { useCallback, useState } from "react";
import {
  HiArrowRight,
  HiEye,
  HiOutlineChevronLeft,
  HiOutlineTag,
  HiOutlineTrash,
  HiPencil,
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
import { LearnIcons } from "src/components/LearnIcons";
import { MemoryMarkdown } from "src/components/Markdown/MemoryMarkdown";
import { useAppDispatch } from "src/store";
import { createReview } from "src/store/reviewsSlice";
import { useLearnMemoryIds, useTag } from "src/store/useSelectors";

import { DeleteMemoryForm } from "../Memories/ExistingMemory/DeleteMemory/DeleteMemoryForm";
import { EditMemoryForm } from "../Memories/ExistingMemory/EditMemory/EditMemoryForm";

const LearnReal = ({ tagId }: { tagId: string }) => {
  const tag = useTag(tagId);
  const learnMemoryIds = useLearnMemoryIds(tagId);

  const [memoryId, setMemoryId] = useState(
    learnMemoryIds.length > 0
      ? learnMemoryIds[Math.floor(Math.random() * learnMemoryIds.length)]
      : null,
  );

  const [view, setView] = useState<"VIEW" | "EDIT" | "DELETE">(`VIEW`);
  const [expand, setExpand] = useState(false);
  const dispatch = useAppDispatch();

  const next = useCallback(() => {
    /*
      Conditions.

      ✅ Don't choose a memory that I have already had a good review 2 times in a row on same day.

      Once I go through 10 memories, start repeating memories. Like, just pull from the last 10 reviews?
    */

    /*
      TODO: This next function is called before the reviews are completed, so technically learnMemoryIds
      is not 100% accurate. This causes a memory to display for a split second before the learnign is
      completed. Eventually, might want to change the review creation to be optimistic instead of
      waiting for firebase to complete.
    */
    if (learnMemoryIds.length > 1) {
      const memoryIdsWithoutPrevious = learnMemoryIds.filter((x) => x != memoryId);
      setMemoryId(
        memoryIdsWithoutPrevious[
          Math.floor(Math.random() * memoryIdsWithoutPrevious.length)
        ],
      );
    }
    if (learnMemoryIds.length === 0) {
      setMemoryId(null);
    }
    setExpand(false);
  }, [learnMemoryIds, memoryId]);

  const isComplete = !memoryId || learnMemoryIds.length === 0;

  const renderTopBar = () => {
    if (view === `EDIT` || view === `DELETE`) {
      return (
        <TopBar
          className="md:border-none"
          title={
            <>
              <HiOutlineTag className="mr-1" /> {tag.name}
            </>
          }
          left={
            <TopBarIconButton
              onClick={() => setView(`VIEW`)}
              Icon={HiOutlineChevronLeft}
              title="Back to learning"
            />
          }
        />
      );
    }

    return (
      <TopBar
        className="md:border-none"
        title={
          <>
            <HiOutlineTag className="mr-1" /> {tag.name}
          </>
        }
        left={<TopBarIconLink to={`/tags/${tagId}`} Icon={HiOutlineChevronLeft} />}
        right={
          isComplete ? undefined : (
            <>
              <TopBarIconButton
                className="mr-4"
                onClick={() => setView(`EDIT`)}
                Icon={HiPencil}
              />
              <TopBarIconButton onClick={() => setView(`DELETE`)} Icon={HiOutlineTrash} />
            </>
          )
        }
      />
    );
  };

  const renderBody = () => {
    if (isComplete) {
      return <p>Good job!</p>;
    }

    if (view === `EDIT`) {
      return (
        <EditMemoryForm
          memoryId={memoryId}
          onCancel={() => setView(`VIEW`)}
          onSuccessfulEdit={() => {
            /*
              I do not want to go the next memory after a successful edit because
              the user should still have the option to review the memory as good
              or bad.
            */
            setView(`VIEW`);
          }}
        />
      );
    }
    if (view === `DELETE`) {
      return (
        <DeleteMemoryForm
          memoryId={memoryId}
          onCancel={() => setView(`VIEW`)}
          onSuccessfulDelete={() => {
            next();
            setView(`VIEW`);
          }}
        />
      );
    }

    return (
      <>
        <MemoryMarkdown memoryId={memoryId} showBack={expand} />
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
                      data: { result: `BAD`, memoryId },
                    }),
                  );
                  next();
                }}
                Icon={HiThumbDown}
              />
              <TopBarIconButton
                className="mr-12"
                title="Next memory"
                onClick={next}
                Icon={HiArrowRight}
              />
              <TopBarIconButton
                title="Good"
                onClick={() => {
                  dispatch(
                    createReview({
                      data: { result: `GOOD`, memoryId },
                    }),
                  );
                  next();
                }}
                Icon={HiThumbUp}
              />
            </>
          )}
        </div>
      </>
    );
  };

  return (
    <>
      {renderTopBar()}
      <BodyView className="whitespace-pre-line flex flex-col justify-center items-center">
        <LearnIcons tagId={tagId} className="mb-8" />
        {renderBody()}
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
