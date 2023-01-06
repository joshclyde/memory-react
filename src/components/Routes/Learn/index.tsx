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
import { Markdown } from "src/components/Markdown";
import { useAppDispatch } from "src/store";
import { createReview } from "src/store/reviewsSlice";
import { useFlashcardsArrayFromTag, useTag } from "src/store/selectors";

import { DeleteMemoryForm } from "../Memories/ExistingMemory/DeleteMemory/DeleteMemoryForm";
import { EditMemoryForm } from "../Memories/ExistingMemory/EditMemory/EditMemoryForm";

const LearnReal = ({ tagId }: { tagId: string }) => {
  const tag = useTag(tagId);
  const flashcards = useFlashcardsArrayFromTag(tagId);

  const [memory, setMemory] = useState(
    flashcards[Math.floor(Math.random() * flashcards.length)],
  );

  const [view, setView] = useState<"VIEW" | "EDIT" | "DELETE">(`VIEW`);

  const [expand, setExpand] = useState(false);
  const dispatch = useAppDispatch();

  const next = useCallback(() => {
    if (flashcards.length > 1) {
      const flashcardsWithoutPrevious = flashcards.filter((x) => x.id != memory.id);
      setMemory(
        flashcardsWithoutPrevious[
          Math.floor(Math.random() * flashcardsWithoutPrevious.length)
        ],
      );
    }
    setExpand(false);
  }, [flashcards, memory.id]);

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
    );
  };

  const renderBody = () => {
    if (view === `EDIT`) {
      return (
        <EditMemoryForm
          memoryId={memory.id}
          memory={memory}
          onCancel={() => setView(`VIEW`)}
          onSuccessfulEdit={() => {
            next();
            setView(`VIEW`);
          }}
        />
      );
    }
    if (view === `DELETE`) {
      return (
        <DeleteMemoryForm
          memoryId={memory.id}
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
        <Markdown className="w-full max-w-[1024px]">{content}</Markdown>
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
                title="Next memory"
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
      </>
    );
  };

  let content = `${memory.front}`;

  if (expand) {
    content = `${content}

---

${expand && memory.back}
`;
  }

  return (
    <>
      {renderTopBar()}
      <BodyView className="whitespace-pre-line flex flex-col justify-center items-center">
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
