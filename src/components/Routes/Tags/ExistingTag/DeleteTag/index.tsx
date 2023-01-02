import { HiOutlineChevronLeft } from "react-icons/hi";

import { Button } from "src/components/Design/Button";
import { TopBar, TopBarIconButton } from "src/components/Design/LayoutLeft";
import { BodyView } from "src/components/Design/LayoutRight";
import { useAppDispatch, useAppSelector } from "src/store";
import { deleteTag } from "src/store/tagsSlice";
import { StateTag } from "src/store/types";

export const DeleteTag = ({
  tagId,
  setView,
  tag,
}: {
  tagId: string;
  tag: StateTag;
  setView: React.Dispatch<React.SetStateAction<"EDIT" | "DELETE" | "VIEW">>;
}) => {
  const dispatch = useAppDispatch();
  const pending = useAppSelector((state) => state.tags.deletePending[tagId]);

  const deleteFunction = async () => {
    await dispatch(deleteTag(tagId));
  };

  if (pending === `PENDING`) {
    return <div>Deletion in progress...</div>;
  }

  if (pending === `SUCCESS`) {
    return <div>Tag successfully deleted.</div>;
  }

  if (pending === `ERROR`) {
    return <div>Failed to delete tag.</div>;
  }

  return (
    <>
      <TopBar
        className="md:border-none"
        title="Delete Tag"
        left={
          <TopBarIconButton onClick={() => setView(`VIEW`)} Icon={HiOutlineChevronLeft} />
        }
      />
      <BodyView>
        Are you sure you want to delete the tag {tag.name}?
        <div className="mt-4">
          {/* TODO: hold down to delete */}
          <Button className="w-24" type="button" onClick={() => deleteFunction()}>
            Confirm
          </Button>
          <Button className="ml-4 w-24" type="button" onClick={() => setView(`VIEW`)}>
            Cancel
          </Button>
        </div>
      </BodyView>
    </>
  );
};
