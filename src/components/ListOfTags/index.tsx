import fuzzysort from "fuzzysort";
import { useMemo, useState } from "react";
import { HiOutlinePlusCircle } from "react-icons/hi";

import { useTagsArrayWithFlashcards } from "src/store/selectors";
import { sortByNumericField } from "src/utils/sort";

import { FilterArea, ScrollItems, TopBarIconLink } from "../Design/LayoutLeft";

import { TagItem } from "./TagItem";

const useLocalTags = (searchTerm: string) => {
  const tags = useTagsArrayWithFlashcards();

  return useMemo(() => {
    if (searchTerm === ``) {
      return tags.sort((a, b) =>
        sortByNumericField(a.flashcardsArray.length, b.flashcardsArray.length),
      );
    }

    return fuzzysort
      .go(searchTerm, tags, {
        keys: [`name`],
        threshold: -100_000,
      })
      .map((x) => {
        return x.obj;
      });
  }, [tags, searchTerm]);
};

export const ListOfTags = () => {
  const [searchTerm, setSearchTerm] = useState(``);
  const tags = useLocalTags(searchTerm);

  return (
    <>
      <FilterArea
        value={searchTerm}
        onChange={(x) => setSearchTerm(x.target.value)}
        title="Tags"
        icon={
          <TopBarIconLink to="/tags/new" className="mr-4" Icon={HiOutlinePlusCircle} />
        }
      />
      <ScrollItems>
        {tags.map((props) => (
          <TagItem key={props.id} {...props} />
        ))}
        <div className="h-24 border-none" />
      </ScrollItems>
    </>
  );
};
