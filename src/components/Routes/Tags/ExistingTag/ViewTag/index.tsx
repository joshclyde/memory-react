import {
  HiOutlineChevronLeft,
  HiOutlineTag,
  HiOutlineTrash,
  HiPencil,
} from "react-icons/hi";

import {
  TopBar,
  TopBarIconButton,
  TopBarIconLink,
} from "src/components/Design/LayoutLeft";
import { BodyView } from "src/components/Design/LayoutRight";
import { Link } from "src/components/Design/Link";
import { LearnIcons } from "src/components/LearnIcons";
import { StateTag } from "src/store/types";

export const ViewTag = ({
  tagId,
  tag,
  setView,
}: {
  tagId: string;
  tag: StateTag;
  setView: React.Dispatch<React.SetStateAction<"EDIT" | "DELETE" | "VIEW">>;
}) => {
  return (
    <>
      <TopBar
        className="md:border-none"
        title="View Tag"
        left={
          <TopBarIconLink className="md:hidden" to="/tags" Icon={HiOutlineChevronLeft} />
        }
        right={
          <>
            <TopBarIconButton
              className="mr-4"
              onClick={() => setView(`EDIT`)}
              Icon={HiPencil}
            />
            <TopBarIconButton onClick={() => setView(`DELETE`)} Icon={HiOutlineTrash} />
          </>
        }
      />
      <BodyView>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-[4px] text-lg">
            <HiOutlineTag className="text-purple-1" />
            {tag.name}
          </div>
          <LearnIcons tagId={tagId} />
          <Link to={`/learn/${tagId}`} className="w-fit">
            Learn
          </Link>
        </div>
      </BodyView>
    </>
  );
};
