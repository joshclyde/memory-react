import { useState } from "react";
import { HiCheck } from "react-icons/hi";

import { TextArea } from "src/components/Design/TextArea";
import { useAppDispatch } from "src/store";
import { createTag } from "src/store/tagsSlice";

import { ActionsView, BodyView, WholeView } from "../ExistingTag/core";

export const NewTag = () => {
  const [name, setName] = useState(``);
  const [status, setStatus] = useState<null | "PENDING" | "ERROR" | "SUCCESS">(null);
  const dispatch = useAppDispatch();

  const save = async () => {
    setStatus(`PENDING`);
    try {
      await dispatch(
        createTag({
          data: {
            name,
          },
        }),
      ).unwrap();
      setStatus(`SUCCESS`);
      setName(``);
    } catch (rejectedValueOrSerializedError) {
      setStatus(`ERROR`);
    }
  };

  return (
    <WholeView>
      <BodyView>
        <div className="flex flex-col">
          <TextArea value={name} onChange={(event) => setName(event.target.value)} />
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
