import { useState } from "react";
import { HiCheck, HiX } from "react-icons/hi";

import { TextArea } from "src/components/Design/TextArea";
import { useAppDispatch, useAppSelector } from "src/store";
import { updateTag } from "src/store/tagsSlice";
import { StateTag } from "src/store/types";

import { ActionsView, BodyView, WholeView } from "../core";

export const EditTag = ({
  tagId,
  tag,
  toggleView,
}: {
  tagId: string;
  tag: StateTag;
  toggleView: () => void;
}) => {
  const [name, setName] = useState(tag.name);
  const [status, setStatus] = useState<null | "PENDING" | "ERROR">(null);
  const dispatch = useAppDispatch();
  const pending = useAppSelector((state) => state.tags.updatePending[tagId]);

  const save = async () => {
    setStatus(`PENDING`);
    try {
      await dispatch(
        updateTag({
          id: tagId,
          data: {
            name,
          },
        }),
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
          <TextArea
            className="mt-4"
            value={name}
            onChange={(event) => setName(event.target.value)}
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
