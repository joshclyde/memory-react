import { useState } from "react";
import { HiCheck, HiOutlineChevronLeft } from "react-icons/hi";

import { Button } from "src/components/Design/Button";
import { TopBar, TopBarIconLink } from "src/components/Design/LayoutLeft";
import { BodyView } from "src/components/Design/LayoutRight";
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
      <TopBar
        className="border-none"
        title="New Tag"
        left={
          <TopBarIconLink className="md:hidden" to="/tags" Icon={HiOutlineChevronLeft} />
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
              <HiCheck className="mr-2" /> Create
            </Button>
          </div>
        </div>
        {status === `PENDING` && `Submitting...`}
        {status === `ERROR` && `Failed to save.`}
      </BodyView>
    </>
  );
};
