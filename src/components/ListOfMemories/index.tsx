import fuzzysort from "fuzzysort";
import { useMemo, useState } from "react";

import { useFlashcardsArray } from "src/store/selectors";

import { Checkbox } from "../Design/Checkbox";
import { FilterArea, LayoutLeft, ScrollItems } from "../Design/LayoutLeft";
import { isMarkdownOmitted } from "../Markdown";

import { MemoryItem } from "./MemoryItem";

const useLocalFlashcards = ({
  searchTerm,
  omittedMarkdown,
}: {
  searchTerm: string;
  omittedMarkdown: boolean;
}) => {
  const flashcards = useFlashcardsArray();

  return useMemo(() => {
    const filteredFlashcards = flashcards.filter(
      (x) => !omittedMarkdown || isMarkdownOmitted(`${x.front}\n${x.back}`),
    );

    if (searchTerm === ``) {
      return filteredFlashcards.sort((a, b) =>
        new Date(a.lastModified).getTime() > new Date(b.lastModified).getTime() ? -1 : 1,
      );
    }

    return fuzzysort
      .go(searchTerm, filteredFlashcards, {
        keys: [`front`, `back`],
        threshold: -100000,
      })
      .map((x) => {
        return x.obj;
      });
  }, [flashcards, searchTerm, omittedMarkdown]);
};

export const ListOfMemories = () => {
  const [searchTerm, setSearchTerm] = useState(``);
  const [omittedMarkdown, setOmittedMarkdown] = useState(false);

  const flashcards = useLocalFlashcards({ searchTerm, omittedMarkdown });

  return (
    <LayoutLeft>
      <FilterArea
        toNew="/memories"
        value={searchTerm}
        onChange={(x) => setSearchTerm(x.target.value)}
      >
        <Checkbox
          id="omitted-markdown"
          name="Omitted Markdown"
          checked={omittedMarkdown}
          onChange={() => setOmittedMarkdown((x) => !x)}
        />
      </FilterArea>
      <ScrollItems>
        {flashcards.map((props) => (
          <MemoryItem key={props.id} {...props} />
        ))}
      </ScrollItems>
    </LayoutLeft>
  );
};
