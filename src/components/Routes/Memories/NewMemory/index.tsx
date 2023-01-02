import { useState } from "react";
import { HiCheck, HiOutlineChevronLeft } from "react-icons/hi";

import { Button } from "src/components/Design/Button";
import { Checkbox } from "src/components/Design/Checkbox";
import { TopBar, TopBarIconLink } from "src/components/Design/LayoutLeft";
import { BodyView } from "src/components/Design/LayoutRight";
import { TextArea } from "src/components/Design/TextArea";
import { useAppDispatch } from "src/store";
import { createFlashcard } from "src/store/flashcardsSlice";
import { useTagsFormOptions } from "src/store/selectors";

export const NewMemory = () => {
  const [front, setFront] = useState(``);
  const [back, setBack] = useState(``);
  const [tags, setTags] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<null | "PENDING" | "ERROR" | "SUCCESS">(null);
  const dispatch = useAppDispatch();
  const tagsFormOptions = useTagsFormOptions();

  const save = async () => {
    setStatus(`PENDING`);
    try {
      await dispatch(
        createFlashcard({
          data: {
            front,
            back,
            tags: Object.entries(tags)
              .filter(([_id, checked]) => checked)
              .map(([id]) => id),
          },
        }),
      ).unwrap();
      setStatus(`SUCCESS`);
      setFront(``);
      setBack(``);
    } catch {
      setStatus(`ERROR`);
    }
  };

  return (
    <>
      <TopBar
        className="border-none"
        title="New Memory"
        left={
          <TopBarIconLink
            className="md:hidden"
            to="/memories"
            Icon={HiOutlineChevronLeft}
          />
        }
      />
      <BodyView>
        <div className="flex flex-col gap-4">
          <fieldset className="flex flex-wrap justify-between gap-2">
            {tagsFormOptions.map(({ id, name }) => {
              return (
                <Checkbox
                  key={id}
                  id={id}
                  name={name}
                  checked={Boolean(tags[id])}
                  onChange={(event) =>
                    setTags((previous) => ({ ...previous, [id]: event.target.checked }))
                  }
                />
              );
            })}
          </fieldset>
          <TextArea value={front} onChange={(event) => setFront(event.target.value)} />
          <TextArea value={back} onChange={(event) => setBack(event.target.value)} />
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
