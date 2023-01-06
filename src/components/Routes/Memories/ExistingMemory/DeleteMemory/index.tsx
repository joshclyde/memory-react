import { HiOutlineChevronLeft } from "react-icons/hi";

import { TopBar, TopBarIconButton } from "src/components/Design/LayoutLeft";
import { BodyView } from "src/components/Design/LayoutRight";

import { DeleteMemoryForm } from "./DeleteMemoryForm";

export const DeleteMemory = ({
  memoryId,
  setView,
}: {
  memoryId: string;
  setView: React.Dispatch<React.SetStateAction<"EDIT" | "DELETE" | "VIEW">>;
}) => {
  return (
    <>
      <TopBar
        className="md:border-none"
        title="Delete Memory"
        left={
          <TopBarIconButton onClick={() => setView(`VIEW`)} Icon={HiOutlineChevronLeft} />
        }
      />
      <BodyView>
        <DeleteMemoryForm memoryId={memoryId} onCancel={() => setView(`VIEW`)} />
      </BodyView>
    </>
  );
};
