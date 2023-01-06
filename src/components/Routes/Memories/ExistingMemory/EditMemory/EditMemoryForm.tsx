import { useState } from "react";
import { HiCheck, HiX } from "react-icons/hi";

import { Button } from "src/components/Design/Button";
import { Checkbox } from "src/components/Design/Checkbox";
import { ErrorMessage } from "src/components/Design/ErrorMessage";
import { TextArea } from "src/components/Design/TextArea";
import { isMarkdownOmitted } from "src/components/Markdown";
import { useAppDispatch, useAppSelector } from "src/store";
import { updateFlashcard } from "src/store/flashcardsSlice";
import { useTagsFormOptions } from "src/store/selectors";
import { StateFlashcard } from "src/store/types";

export const EditMemoryForm = ({
  memoryId,
  memory,
  onCancel,
  onSuccessfulEdit,
}: {
  memoryId: string;
  memory: StateFlashcard;
  onCancel: () => void;
  onSuccessfulEdit?: () => void;
}) => {
  const [front, setFront] = useState(memory.front);
  const [back, setBack] = useState(memory.back);
  const [tags, setTags] = useState(
    Object.fromEntries(memory.tags.map((tag) => [tag, true])),
  );
  const dispatch = useAppDispatch();
  const pending = useAppSelector((state) => state.flashcards.updatePending[memoryId]);
  const tagsFormOptions = useTagsFormOptions();

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
    onSuccessfulEdit?.();
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        <fieldset className="flex flex-wrap justify-between gap-2">
          {tagsFormOptions.map(({ id, name }) => {
            return (
              <Checkbox
                key={id}
                id={id}
                name={name}
                checked={Boolean(tags[id])}
                onChange={(event) =>
                  setTags((previous) => ({ ...previous, [id]: event.target.checked }))
                }
              />
            );
          })}
        </fieldset>
        <TextArea value={front} onChange={(event) => setFront(event.target.value)} />
        <TextArea value={back} onChange={(event) => setBack(event.target.value)} />
        {isMarkdownOmitted(`${front}\n${back}`) && (
          <ErrorMessage>
            Review your memory for content that will be omitted.
          </ErrorMessage>
        )}
        <div className="flex justify-end">
          <Button
            onClick={() => save()}
            className="flex justify-center items-center w-24"
          >
            <HiCheck className="mr-2" /> Save
          </Button>
          <Button
            onClick={() => onCancel()}
            className="flex justify-center items-center ml-2 w-24"
          >
            <HiX className="mr-2" /> Cancel
          </Button>
        </div>
      </div>
      {pending === `PENDING` && `Submitting...`}
      {pending === `ERROR` && `Failed to save.`}
    </>
  );
};
