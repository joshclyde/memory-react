import { useState } from "react";
import { HiCheck, HiX } from "react-icons/hi";

import { Checkbox } from "src/components/Design/Checkbox";
import { TextArea } from "src/components/Design/TextArea";
import { useAppDispatch, useAppSelector } from "src/store";
import { createFlashcard } from "src/store/flashcardsSlice";
import { useTagsFormOptions } from "src/store/selectors";
import { StateFlashcard } from "src/store/types";

import { ActionsView, BodyView, WholeView } from "../ExistingMemory/core";

export const NewMemory = () => {
  const [front, setFront] = useState(``);
  const [back, setBack] = useState(``);
  const [tags, setTags] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<null | "PENDING" | "ERROR" | "SUCCESS">(null);
  const dispatch = useAppDispatch();
  const tagsFormOptions = useTagsFormOptions();

  const save = async () => {
    setStatus(`PENDING`);
    try {
      await dispatch(
        createFlashcard({
          data: {
            front,
            back,
            tags: Object.entries(tags)
              .filter(([_id, checked]) => checked)
              .map(([id]) => id),
          },
        }),
      ).unwrap();
      setStatus(`SUCCESS`);
      setFront(``);
      setBack(``);
    } catch (rejectedValueOrSerializedError) {
      setStatus(`ERROR`);
    }
  };

  return (
    <WholeView>
      <BodyView>
        <div className="flex flex-col">
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
          <TextArea
            className="mt-4"
            value={front}
            onChange={(event) => setFront(event.target.value)}
          />
          <TextArea
            className="mt-4"
            value={back}
            onChange={(event) => setBack(event.target.value)}
          />
        </div>
        {status === `PENDING` && `Submitting...`}
        {status === `ERROR` && `Failed to save.`}
      </BodyView>
      <ActionsView>
        <button
          title="Save Changes"
          type="button"
          className="mt-4"
          onClick={() => save()}
        >
          <HiCheck size="2em" />
        </button>
      </ActionsView>
    </WholeView>
  );
};
