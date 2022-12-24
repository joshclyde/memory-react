import { useState } from "react";
import { HiCheck, HiX } from "react-icons/hi";

import { Checkbox } from "src/components/Design/Checkbox";
import { ErrorMessage } from "src/components/Design/ErrorMessage";
import {
  ActionsIconButton,
  ActionsView,
  BodyView,
  WholeView
} from "src/components/Design/LayoutRight";
import { TextArea } from "src/components/Design/TextArea";
import { useMarkdownIsOmitted } from "src/components/Markdown";
import { useAppDispatch, useAppSelector } from "src/store";
import { updateFlashcard } from "src/store/flashcardsSlice";
import { useTagsFormOptions } from "src/store/selectors";
import { StateFlashcard } from "src/store/types";

export const EditMemory = ({
  memoryId,
  memory,
  toggleView,
}: {
  memoryId: string;
  memory: StateFlashcard;
  toggleView: () => void;
}) => {
  const [front, setFront] = useState(memory.front);
  const [back, setBack] = useState(memory.back);
  const [tags, setTags] = useState(
    Object.fromEntries(memory.tags.map((tag) => [tag, true])),
  );
  const dispatch = useAppDispatch();
  const pending = useAppSelector((state) => state.flashcards.updatePending[memoryId]);
  const tagsFormOptions = useTagsFormOptions();

  const isOmitted = useMarkdownIsOmitted(`${front} ${back}`);

  const save = async () => {
    await dispatch(
      updateFlashcard({
        id: memoryId,
        data: {
          front,
          back,
          tags: Object.entries(tags)
            .filter(([_id, checked]) => checked)
            .map(([id]) => id),
        },
      }),
    ).unwrap();
    toggleView();
  };

  return (
    <WholeView>
      <BodyView>
        <div className="flex flex-col gap-4">
          <fieldset className="flex flex-wrap justify-between gap-2">
            {tagsFormOptions.map(({ id, name }) => {
              return (
                <Checkbox
                  key={id}
                  id={id}
                  name={name}
                  checked={Boolean(tags[id])}
                  onChange={(e) =>
                    setTags((prev) => ({ ...prev, [id]: e.target.checked }))
                  }
                />
              );
            })}
          </fieldset>
          <TextArea value={front} onChange={(event) => setFront(event.target.value)} />
          <TextArea value={back} onChange={(event) => setBack(event.target.value)} />
          {isOmitted && (
            <ErrorMessage>
              Review your memory for content that will be omitted.
            </ErrorMessage>
          )}
        </div>
        {pending === `PENDING` && `Submitting...`}
        {pending === `ERROR` && `Failed to save.`}
      </BodyView>
      <ActionsView>
        <ActionsIconButton
          title="Cancel Changes"
          onClick={() => toggleView()}
          Icon={HiX}
        />
        <ActionsIconButton title="Save Changes" onClick={() => save()} Icon={HiCheck} />
      </ActionsView>
    </WholeView>
  );
};
