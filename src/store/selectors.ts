import { StateFlashcard, StateTag } from "./types";

import { RootState, useAppSelector } from ".";

const selectFlashcards = (state: RootState): Record<string, StateFlashcard> => {
  return Object.entries(state.flashcards.flashcardsIncludingDeleted)
    .filter(([, value]) => !value.isDeleted)
    .reduce((obj, [key, value]) => {
      return Object.assign(obj, {
        [key]: value,
      });
    }, {});
};

export const useFlashcards = (): Record<string, StateFlashcard> => {
  const flashcardsIncludingDeleted = useAppSelector(
    (state) => state.flashcards.flashcardsIncludingDeleted,
  );
  return Object.entries(flashcardsIncludingDeleted)
    .filter(([, value]) => !value.isDeleted)
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
    .filter(([, value]) => !value.isDeleted)
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

export const useTagFlashcardsCount = (tagId: string) => {
  return useAppSelector((state) => {
    return Object.values(selectFlashcards(state)).filter((x) => x.tags.includes(tagId))
      .length;
  });
};
