import { StateFlashcard } from "./types";

import { useAppSelector } from ".";

export const useFlashcards = (): Record<string, StateFlashcard> => {
  const flashcardsIncludingDeleted = useAppSelector(
    (state) => state.flashcards.flashcardsIncludingDeleted,
  );
  return Object.entries(flashcardsIncludingDeleted)
    .filter(([key, value]) => !value.isDeleted)
    .reduce((obj, [key, value]) => {
      return Object.assign(obj, {
        [key]: value,
      });
    }, {});
};

export const useFlashcardsArray = () => {
  const flashcards = useFlashcards();
  return Object.entries(flashcards).map(([id, values]) => ({ ...values, id }));
};
