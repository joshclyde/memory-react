import { useState } from "react";
import { HiArrowRight, HiEye } from "react-icons/hi";
import { useParams } from "react-router-dom";

import {
  ActionsIconButton,
  ActionsView,
  BodyView,
  WholeView
} from "src/components/Design/LayoutRight";
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
          <ActionsIconButton
            title="Show answer"
            onClick={() => setExpand(true)}
            Icon={HiEye}
           />
        )}
        {expand && (
          <ActionsIconButton
            title="Next flashcard"
            onClick={() => {
              setCurrent((x) => x + 1);
              setExpand(false);
            }}
            Icon={HiArrowRight}
          />
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
