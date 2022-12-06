import { useState } from "react";
import { HiCheck, HiX } from "react-icons/hi";

import { TextArea } from "src/components/Design/TextArea";
import { useAppDispatch, useAppSelector } from "src/store";
import { updateFlashcard } from "src/store/flashcardsSlice";
import { StateFlashcard } from "src/store/types";

import { ActionsView, BodyView, WholeView } from "../core";

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
  const [status, setStatus] = useState<null | "PENDING" | "ERROR">(null);
  const dispatch = useAppDispatch();
  const pending = useAppSelector((state) => state.flashcards.updatePending[memoryId]);

  const save = async () => {
    setStatus(`PENDING`);
    try {
      await dispatch(
        updateFlashcard({ id: memoryId, data: { front, back, tags: memory.tags } }),
      ).unwrap();
      toggleView();
    } catch (rejectedValueOrSerializedError) {
      setStatus(`ERROR`);
    }
  };

  return (
    <WholeView>
      <BodyView>
        <div className="flex flex-col">
          <TextArea value={front} onChange={(event) => setFront(event.target.value)} />
          <TextArea
            className="mt-4"
            value={back}
            onChange={(event) => setBack(event.target.value)}
          />
        </div>
        {pending === `PENDING` && `Submitting...`}
        {pending === `ERROR` && `Failed to save.`}
      </BodyView>
      <ActionsView>
        <button title="Cancel Changes" type="button" onClick={() => toggleView()}>
          <HiX size="2em" />
        </button>
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
