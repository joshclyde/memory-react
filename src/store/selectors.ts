import { isToday } from "date-fns";

import { sortByDateString } from "src/utils/sort";

import { StateFlashcard, StateReview } from "./types";

import { RootState } from ".";

export const selectFlashcards = (state: RootState): Record<string, StateFlashcard> => {
  return Object.fromEntries(
    Object.entries(state.flashcards.flashcardsIncludingDeleted).filter(
      ([, value]) => !value.isDeleted,
    ),
  );
};

export const selectFlashcardsArray = (state: RootState) => {
  return Object.entries(selectFlashcards(state)).map(([id, values]) => ({
    ...values,
    id,
  }));
};

export const selectFlashcardsArrayFromTagId = (state: RootState, tagId: string) => {
  return selectFlashcardsArray(state).filter((x) => x.tags.includes(tagId));
};

export const selectReviewsArray = (state: RootState) => {
  return Object.entries(state.reviews.reviews).map(([id, values]) => ({
    ...values,
    id,
  }));
};

export const selectLearnMemoryIds = (state: RootState, tagId: string) => {
  const flashcards = selectFlashcardsArrayFromTagId(state, tagId);
  const reviews = selectReviewsArray(state);
  const reviewsByMemory: Record<string, Array<StateReview>> = {};
  for (const x of reviews) {
    if (reviewsByMemory[x.memoryId]) {
      reviewsByMemory[x.memoryId].push(x);
    } else {
      reviewsByMemory[x.memoryId] = [x];
    }
  }

  return flashcards
    .filter((memory) => {
      const flashcardReviews = reviewsByMemory[memory.id];
      if (!flashcardReviews) {
        return true;
      }
      flashcardReviews.sort((a, b) => sortByDateString(a.createdDate, b.createdDate));
      return !(
        flashcardReviews.length >= 2 &&
        isToday(new Date(flashcardReviews[0].createdDate)) &&
        isToday(new Date(flashcardReviews[1].createdDate)) &&
        flashcardReviews[0].result === `GOOD` &&
        flashcardReviews[1].result === `GOOD`
      );
    })
    .map((x) => x.id);
};
