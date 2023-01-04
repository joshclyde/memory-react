import { sortByAlphabet } from "src/utils/sort";

import { StateFlashcard, StateTag } from "./types";

import { RootState, useAppSelector } from ".";

const selectFlashcards = (state: RootState): Record<string, StateFlashcard> => {
  return Object.fromEntries(
    Object.entries(state.flashcards.flashcardsIncludingDeleted).filter(
      ([, value]) => !value.isDeleted,
    ),
  );
};

const selectFlashcardsArray = (state: RootState) => {
  return Object.entries(selectFlashcards(state)).map(([id, values]) => ({
    ...values,
    id,
  }));
};

const selectFlashcardsFromTagId = (state: RootState, tagId: string) => {
  return selectFlashcardsArray(state).filter((x) => x.tags.includes(tagId));
};

const selectReviewsArray = (state: RootState) => {
  return Object.entries(state.reviews.reviews).map(([id, values]) => ({
    ...values,
    id,
  }));
};

export const useFlashcards = (): Record<string, StateFlashcard> => {
  const flashcardsIncludingDeleted = useAppSelector(
    (state) => state.flashcards.flashcardsIncludingDeleted,
  );
  return Object.fromEntries(
    Object.entries(flashcardsIncludingDeleted).filter(([, value]) => !value.isDeleted),
  );
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
  return Object.fromEntries(
    Object.entries(tagsIncludingDeleted).filter(([, value]) => !value.isDeleted),
  );
};

export const useTag = (tagId: string) => {
  return useAppSelector((state) => state.tags.tagsIncludingDeleted[tagId]);
};

export const useTagsArray = () => {
  const tags = useTags();
  return Object.entries(tags).map(([id, values]) => ({ ...values, id }));
};

export const useTagsFormOptions = (): Array<{ id: string; name: string }> => {
  const tags = useTags();
  return Object.entries(tags)
    .map(([id, { name }]) => ({ id, name }))
    .sort((a, b) => sortByAlphabet(a.name, b.name));
};

export const useTagFlashcardsCount = (tagId: string) => {
  return useAppSelector((state) => {
    return selectFlashcardsFromTagId(state, tagId).length;
  });
};

export const useReviewsArray = () => {
  return useAppSelector((state) => selectReviewsArray(state));
};
