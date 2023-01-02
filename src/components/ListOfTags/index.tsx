import fuzzysort from "fuzzysort";
import { useMemo, useState } from "react";
import { HiOutlinePlusSm } from "react-icons/hi";
import { Link } from "react-router-dom";

import { useTagsArray } from "src/store/selectors";

import { FilterArea, ScrollItems } from "../Design/LayoutLeft";

import { TagItem } from "./TagItem";

const useLocalTags = (searchTerm: string) => {
  const tags = useTagsArray();

  return useMemo(() => {
    if (searchTerm === ``) {
      return tags.sort((a, b) =>
        new Date(a.lastModified).getTime() > new Date(b.lastModified).getTime() ? -1 : 1,
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
      />
      <ScrollItems>
        {tags.map((props) => (
          <TagItem key={props.id} {...props} />
        ))}
        <div className="h-24 border-none" />
      </ScrollItems>
      <Link
        to="/tags/new"
        className="absolute bottom-2 right-2 bg-dark-1 p-4 rounded-full"
      >
        <HiOutlinePlusSm size="2em" />
      </Link>
    </>
  );
};
