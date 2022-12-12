import fuzzysort from "fuzzysort";
import { useMemo, useState } from "react";
import { HiPlus } from "react-icons/hi";
import { Link, NavLink } from "react-router-dom";

import { useTagsArray } from "src/store/selectors";

import { Item } from "./Item";

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
        keys: [`front`, `back`],
        threshold: -100000,
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
    <div className="basis-96 shrink-0 bg-dark-2 border-r border-dark-1 h-screen flex flex-col">
      <div className="flex p-2 items-center border-dark-1 border-b">
        <input
          className="border border-black grow bg-dark-2 border-blue-1 rounded-lg text-blue-1 pl-2 text-base"
          type="text"
          value={searchTerm}
          onChange={(x) => setSearchTerm(x.target.value)}
        />
        <Link to="/tags" className="ml-2 text-blue-1 border border-blue-1 rounded">
          <HiPlus />
        </Link>
      </div>
      <div className="divide-y overflow-y-scroll">
        {tags.map(({ id, ...props }) => {
          return (
            <div key={id} className="border-dark-1">
              <NavLink to={`/tags/${id}`}>
                {({ isActive }) => <Item {...props} isActive={isActive} />}
              </NavLink>
            </div>
          );
        })}
      </div>
    </div>
  );
};
