import fuzzysort from "fuzzysort";
import { useMemo, useState } from "react";
import { HiPlus } from "react-icons/hi";
import { Link } from "react-router-dom";

import { flashcardsState } from "@Components/state";

import { Item } from "./Item";

export const ListOfMemories = () => {
  const [searchTerm, setSearchTerm] = useState(``);

  const flashcards = useMemo(() => {
    if (searchTerm === ``) {
      return flashcardsState;
    }

    return fuzzysort
      .go(searchTerm, flashcardsState, {
        keys: [`front`, `back`],
        threshold: -100000,
      })
      .map((x) => {
        return x.obj;
      });
  }, [searchTerm]);

  return (
    <div className="basis-96 shrink-0 bg-dark-2 border-r border-dark-1 h-screen flex flex-col">
      <div className="flex p-2 items-center border-dark-1 border-b">
        <input
          className="border border-black grow bg-dark-2 border-blue-1 rounded-lg text-blue-1 pl-2 text-base"
          type="text"
          value={searchTerm}
          onChange={(x) => setSearchTerm(x.target.value)}
        />
        <Link to="/memories" className="ml-2 text-blue-1 border border-blue-1 rounded">
          <HiPlus />
        </Link>
      </div>
      <div className="divide-y overflow-y-scroll">
        {flashcards.map(({ id, ...props }) => {
          return (
            <div key={id} className="border-dark-1">
              <Link to={`/memories/${id}`}>
                <Item {...props} />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};
