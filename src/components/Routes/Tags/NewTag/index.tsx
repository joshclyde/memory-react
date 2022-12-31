import { useState } from "react";
import { HiCheck } from "react-icons/hi";

import {
  ActionsIconButton,
  ActionsView,
  BodyView,
} from "src/components/Design/LayoutRight";
import { TextArea } from "src/components/Design/TextArea";
import { useAppDispatch } from "src/store";
import { createTag } from "src/store/tagsSlice";

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
    } catch {
      setStatus(`ERROR`);
    }
  };

  return (
    <>
      <BodyView toBackLink="/tags">
        <div className="flex flex-col">
          <TextArea value={name} onChange={(event) => setName(event.target.value)} />
        </div>
        {status === `PENDING` && `Submitting...`}
        {status === `ERROR` && `Failed to save.`}
      </BodyView>
      <ActionsView>
        <ActionsIconButton title="Save Changes" onClick={() => save()} Icon={HiCheck} />
      </ActionsView>
    </>
  );
};
