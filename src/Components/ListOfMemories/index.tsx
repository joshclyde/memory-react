import { Link } from "react-router-dom";

import { state } from "@Components/state";

import { Item } from "./Item";

export const ListOfMemories = () => {
  return (
    <div className="divide-y">
      {Object.entries(state.flashcards.flashcardsIncludingDeleted).map(([id, props]) => {
        return (
          <Link key={id} to={`/memories/${id}`}>
            <Item {...props} />
          </Link>
        );
      })}
    </div>
  );
};
