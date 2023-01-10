import { HiOutlineCheck, HiOutlineDocument } from "react-icons/hi";

import {
  useFlashcardsLengthFromTagId,
  useLearnMemoryIdsLength,
} from "src/store/useSelectors";

export const LearnIcons = ({
  tagId,
  className,
}: {
  tagId: string;
  className?: string;
}) => {
  const learnLength = useLearnMemoryIdsLength(tagId);
  const allLength = useFlashcardsLengthFromTagId(tagId);
  const completeLength = allLength - learnLength;

  return (
    <div className={`flex flex-row gap-4 ${className}`}>
      {learnLength > 0 && (
        <div className="flex items-center gap-[4px]">
          <HiOutlineDocument className="text-purple-1" /> {learnLength}
        </div>
      )}
      {completeLength > 0 && (
        <div className="flex items-center gap-[4px]">
          <HiOutlineCheck className="text-green-1" />
          {completeLength}
        </div>
      )}
    </div>
  );
};
