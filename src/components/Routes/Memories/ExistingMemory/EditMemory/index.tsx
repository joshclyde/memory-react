import { HiOutlineChevronLeft } from "react-icons/hi";

import { TopBar, TopBarIconButton } from "src/components/Design/LayoutLeft";
import { BodyView } from "src/components/Design/LayoutRight";
import { StateFlashcard } from "src/store/types";

import { EditMemoryForm } from "./EditMemoryForm";

export const EditMemory = ({
  memoryId,
  memory,
  setView,
}: {
  memoryId: string;
  memory: StateFlashcard;
  setView: React.Dispatch<React.SetStateAction<"EDIT" | "DELETE" | "VIEW">>;
}) => {
  return (
    <>
      <TopBar
        className="md:border-none"
        title="Edit Memory"
        left={
          <TopBarIconButton onClick={() => setView(`VIEW`)} Icon={HiOutlineChevronLeft} />
        }
      />
      <BodyView>
        <EditMemoryForm
          memoryId={memoryId}
          memory={memory}
          onSuccessfulEdit={() => setView(`VIEW`)}
          onCancel={() => setView(`VIEW`)}
        />
      </BodyView>
    </>
  );
};
