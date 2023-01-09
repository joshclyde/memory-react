import { sortByAlphabet } from "src/utils/sort";

import {
  selectFlashcardsFromTagId,
  selectLearnMemoryIds,
  selectReviewsArray,
} from "./selectors";
import { StateFlashcard, StateTag } from "./types";

import { useAppSelector } from ".";

export const useFlashcards = (): Record<string, StateFlashcard> => {
  const flashcardsIncludingDeleted = useAppSelector(
    (state) => state.flashcards.flashcardsIncludingDeleted,
  );
  return Object.fromEntries(
    Object.entries(flashcardsIncludingDeleted).filter(([, value]) => !value.isDeleted),
  );
};

export const useMemory = (memoryId: string) => {
  return useAppSelector((state) => state.flashcards.flashcardsIncludingDeleted[memoryId]);
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

export const useTagsArrayWithFlashcards = () => {
  return useAppSelector((state) => {
    return Object.entries(state.tags.tagsIncludingDeleted).map(([id, values]) => ({
      ...values,
      id,
      flashcardsArray: selectFlashcardsFromTagId(state, id),
    }));
  });
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

export const useLearnMemoryIds = (tagId: string) => {
  console.log(`in useLearnMemoryIds`);
  return useAppSelector((state) => selectLearnMemoryIds(state, tagId));
};
