import fuzzysort from "fuzzysort";
import { useEffect, useMemo, useRef, useState } from "react";
import { HiOutlineDocumentAdd, HiOutlineFilter, HiOutlineTag } from "react-icons/hi";

import { useFlashcardsArray, useTagsFormOptions } from "src/store/useSelectors";

import { Checkbox } from "../Design/Checkbox";
import {
  FilterArea,
  ScrollItems,
  TopBarIconButton,
  TopBarIconLink,
} from "../Design/LayoutLeft";
import { isMarkdownOmitted } from "../Markdown";

import { MemoryItem } from "./MemoryItem";

const useLocalFlashcards = ({
  searchTerm,
  omittedMarkdown,
  tags,
}: {
  searchTerm: string;
  omittedMarkdown: boolean;
  tags: Record<string, boolean>;
}) => {
  const flashcards = useFlashcardsArray();

  return useMemo(() => {
    const filteredFlashcards = flashcards
      .filter((x) => !omittedMarkdown || isMarkdownOmitted(`${x.front}\n${x.back}`))
      .filter((x) => !Object.values(tags).includes(true) || x.tags.some((y) => tags[y]));

    if (searchTerm === ``) {
      return filteredFlashcards.sort((a, b) =>
        new Date(a.lastModified).getTime() > new Date(b.lastModified).getTime() ? -1 : 1,
      );
    }

    return fuzzysort
      .go(searchTerm, filteredFlashcards, {
        keys: [`front`, `back`],
        threshold: -100_000,
      })
      .map((x) => {
        return x.obj;
      });
  }, [flashcards, searchTerm, omittedMarkdown, tags]);
};

export const ListOfMemories = () => {
  const [searchTerm, setSearchTerm] = useState(``);
  const [omittedMarkdown, setOmittedMarkdown] = useState(false);

  const [tags, setTags] = useState<Record<string, boolean>>({});
  const tagsFormOptions = useTagsFormOptions();

  const [showFilter, setShowFilter] = useState(false);
  const filterReference = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showFilter) {
      filterReference.current?.scrollIntoView();
    }
  }, [showFilter]);

  const flashcards = useLocalFlashcards({ searchTerm, omittedMarkdown, tags });

  return (
    <>
      <FilterArea
        value={searchTerm}
        onChange={(x) => setSearchTerm(x.target.value)}
        title="Memories"
        icon={
          <>
            <TopBarIconLink
              to="/memories/new"
              className="mr-4"
              Icon={HiOutlineDocumentAdd}
            />
            <TopBarIconButton
              onClick={() => setShowFilter((x) => !x)}
              className="mr-4"
              Icon={HiOutlineFilter}
            />
          </>
        }
      />
      <ScrollItems>
        {showFilter && (
          <div ref={filterReference} className="p-2">
            <Checkbox
              id="omitted-markdown"
              name="Omitted Markdown"
              checked={omittedMarkdown}
              onChange={() => setOmittedMarkdown((x) => !x)}
              className="mb-4"
            />
            <fieldset className="flex flex-col gap-2">
              {tagsFormOptions.map(({ id, name }) => {
                return (
                  <Checkbox
                    key={id}
                    id={id}
                    name={name}
                    checked={Boolean(tags[id])}
                    onChange={(event) =>
                      setTags((previous) => ({
                        ...previous,
                        [id]: event.target.checked,
                      }))
                    }
                  >
                    <div className="flex items-center gap-[4px]">
                      <HiOutlineTag /> {name}
                    </div>
                  </Checkbox>
                );
              })}
            </fieldset>
          </div>
        )}
        {flashcards.map((props) => (
          <MemoryItem key={props.id} {...props} />
        ))}
        <div className="h-24 border-none" />
      </ScrollItems>
    </>
  );
};
