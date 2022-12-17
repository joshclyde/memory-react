import fuzzysort from "fuzzysort";
import { useMemo, useState } from "react";

import { useFlashcardsArray } from "src/store/selectors";

import { FilterArea, LayoutLeft, ScrollItems } from "../Design/LayoutLeft";

import { MemoryItem } from "./MemoryItem";

const useLocalFlashcards = (searchTerm: string) => {
  const flashcards = useFlashcardsArray();

  return useMemo(() => {
    if (searchTerm === ``) {
      return flashcards.sort((a, b) =>
        new Date(a.lastModified).getTime() > new Date(b.lastModified).getTime() ? -1 : 1,
      );
    }

    return fuzzysort
      .go(searchTerm, flashcards, {
        keys: [`front`, `back`],
        threshold: -100000,
      })
      .map((x) => {
        return x.obj;
      });
  }, [flashcards, searchTerm]);
};

export const ListOfMemories = () => {
  const [searchTerm, setSearchTerm] = useState(``);
  const flashcards = useLocalFlashcards(searchTerm);

  return (
    <LayoutLeft>
      <FilterArea
        toNew="/memories"
        value={searchTerm}
        onChange={(x) => setSearchTerm(x.target.value)}
      />
      <ScrollItems>
        {flashcards.map((props) => (
          <MemoryItem key={props.id} {...props} />
        ))}
      </ScrollItems>
    </LayoutLeft>
  );
};
