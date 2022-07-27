import { state } from "@Components/state";

import { Item } from "./Item";

export const ListOfMemories = () => {
  return (
    <div className="divide-y">
      {Object.entries(state.flashcards.flashcardsIncludingDeleted).map(([id, props]) => {
        return <Item key={id} {...props} />;
      })}
    </div>
  );
};
