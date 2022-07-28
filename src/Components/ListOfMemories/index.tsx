import { Link } from "react-router-dom";

import { state } from "@Components/state";

import { Item } from "./Item";

export const ListOfMemories = () => {
  return (
    <div className="divide-y overflow-y-scroll">
      {Object.entries(state.flashcards.flashcardsIncludingDeleted).map(([id, props]) => {
        return (
          <div key={id} className="border-dark-1">
            <Link to={`/memories/${id}`}>
              <Item {...props} />
            </Link>
          </div>
        );
      })}
    </div>
  );
};
