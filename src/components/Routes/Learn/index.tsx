import { useState } from "react";
import { HiArrowRight, HiEye } from "react-icons/hi";
import { useParams } from "react-router-dom";

import { ActionsView, BodyView, WholeView } from "src/components/Design/LayoutRight";
import { useFlashcardsArrayFromTag } from "src/store/selectors";

const LearnReal = ({ tagId }: { tagId: string }) => {
  const flashcards = useFlashcardsArrayFromTag(tagId);

  const [current, setCurrent] = useState(0);
  const [expand, setExpand] = useState(false);

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
          <button title="Show answer" type="button" onClick={() => setExpand(true)}>
            <HiEye size="2em" />
          </button>
        )}
        {expand && (
          <button
            title="Next flashcard"
            type="button"
            onClick={() => {
              setCurrent((x) => x + 1);
              setExpand(false);
            }}
          >
            <HiArrowRight size="2em" />
          </button>
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
