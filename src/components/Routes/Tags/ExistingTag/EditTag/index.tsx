import { useState } from "react";
import { HiCheck, HiX } from "react-icons/hi";

import {
  ActionsIconButton,
  ActionsView,
  BodyView,
  WholeView,
} from "src/components/Design/LayoutRight";
import { TextArea } from "src/components/Design/TextArea";
import { useAppDispatch, useAppSelector } from "src/store";
import { updateTag } from "src/store/tagsSlice";
import { StateTag } from "src/store/types";

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
  const dispatch = useAppDispatch();
  const pending = useAppSelector((state) => state.tags.updatePending[tagId]);

  const save = async () => {
    await dispatch(
      updateTag({
        id: tagId,
        data: {
          name,
        },
      }),
    ).unwrap();
    toggleView();
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
        <ActionsIconButton
          title="Cancel Changes"
          onClick={() => toggleView()}
          Icon={HiX}
        />
        <ActionsIconButton
          title="Save Changes"
          className="mt-4"
          onClick={() => save()}
          Icon={HiCheck}
        />
      </ActionsView>
    </WholeView>
  );
};
