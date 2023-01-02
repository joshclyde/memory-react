import { useState } from "react";
import { HiCheck, HiOutlineChevronLeft, HiX } from "react-icons/hi";

import { Button } from "src/components/Design/Button";
import { TopBar, TopBarIconButton } from "src/components/Design/LayoutLeft";
import { BodyView } from "src/components/Design/LayoutRight";
import { TextArea } from "src/components/Design/TextArea";
import { useAppDispatch, useAppSelector } from "src/store";
import { updateTag } from "src/store/tagsSlice";
import { StateTag } from "src/store/types";

export const EditTag = ({
  tagId,
  tag,
  setView,
}: {
  tagId: string;
  tag: StateTag;
  setView: React.Dispatch<React.SetStateAction<"EDIT" | "DELETE" | "VIEW">>;
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
    setView(`VIEW`);
  };

  return (
    <>
      <TopBar
        className="md:border-none"
        title="Edit Tag"
        left={
          <TopBarIconButton onClick={() => setView(`VIEW`)} Icon={HiOutlineChevronLeft} />
        }
      />
      <BodyView>
        <div className="flex flex-col gap-4">
          <TextArea value={name} onChange={(event) => setName(event.target.value)} />
          <div className="flex justify-end">
            <Button
              onClick={() => save()}
              className="flex justify-center items-center w-24"
            >
              <HiCheck className="mr-2" /> Save
            </Button>
            <Button
              onClick={() => setView(`VIEW`)}
              className="flex justify-center items-center ml-2 w-24"
            >
              <HiX className="mr-2" /> Cancel
            </Button>
          </div>
        </div>
        {pending === `PENDING` && `Submitting...`}
        {pending === `ERROR` && `Failed to save.`}
      </BodyView>
    </>
  );
};
