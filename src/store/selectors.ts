import { StateFlashcard, StateTag } from "./types";

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

export const useFlashcardsArrayFromTag = (tagId: string) => {
  const flashcards = useFlashcardsArray();
  return flashcards.filter(({ tags }) => tags.includes(tagId));
};

export const useTags = (): Record<string, StateTag> => {
  const tagsIncludingDeleted = useAppSelector((state) => state.tags.tagsIncludingDeleted);
  return Object.entries(tagsIncludingDeleted)
    .filter(([key, value]) => !value.isDeleted)
    .reduce((obj, [key, value]) => {
      return Object.assign(obj, {
        [key]: value,
      });
    }, {});
};

export const useTagsArray = () => {
  const tags = useTags();
  return Object.entries(tags).map(([id, values]) => ({ ...values, id }));
};

export const useTagsFormOptions = (): Array<{ id: string; name: string }> => {
  const tags = useTags();
  return Object.entries(tags).map(([id, { name }]) => ({ id, name }));
};
