import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import {
  createFlashcard,
  updateFlashcard as updateFlashcardFirestore,
  fetchFlashcards,
  deleteFlashcard,
} from "src/firebase";
import { FirestoreFlashcardUserInput } from "src/firebase/firestore/types";
import { convertComputedFields, convertLastModified } from "src/utils/firestore";

import { StateFlashcard } from "./types";

import type { RootState } from "./";

export interface FlashcardsState {
  flashcardsIncludingDeleted: Record<string, StateFlashcard>;
  loading: null | "PENDING" | "SUCCESS" | "ERROR";
  updatePending: Record<string, "PENDING" | "SUCCESS" | "ERROR">;
}

const initialState: FlashcardsState = {
  flashcardsIncludingDeleted: {},
  loading: null,
  updatePending: {},
};

export const fetchFlashcardsThunk = createAsyncThunk(`flashcards/fetch`, async () => {
  const firestoreFlashcards = await fetchFlashcards();
  let data: Record<string, StateFlashcard> = {};
  Object.entries(firestoreFlashcards).forEach(([id, firestoreFlashcard]) => {
    data[id] = convertComputedFields(firestoreFlashcard);
  });
  return data;
});

// async update(id: string, data: FirestoreFlashcardUserInput) {
//   const firestoreFlashcard = await updateFlashcard(id, data);
//   this.flashcardsIncludingDeleted[id] = {
//     ...this.flashcards[id],
//     ...convertLastModified(firestoreFlashcard),
//   };
// },

export const updateFlashcard = createAsyncThunk(
  `flashcards/update`,
  async ({ id, data }: { id: string; data: FirestoreFlashcardUserInput }) => {
    const firestoreFlashcard = await updateFlashcardFirestore(id, data);
    return convertLastModified(firestoreFlashcard);
  },
);

export const flashcardsSlice = createSlice({
  name: `flashcards`,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFlashcardsThunk.pending, (state, action) => {
      state.loading = `PENDING`;
    });
    builder.addCase(fetchFlashcardsThunk.fulfilled, (state, action) => {
      state.flashcardsIncludingDeleted = action.payload;
      state.loading = `SUCCESS`;
    });
    builder.addCase(fetchFlashcardsThunk.rejected, (state, action) => {
      state.loading = `ERROR`;
    });
    builder.addCase(updateFlashcard.pending, (state, action) => {
      state.updatePending[action.meta.arg.id] = `PENDING`;
    });
    builder.addCase(updateFlashcard.fulfilled, (state, action) => {
      state.flashcardsIncludingDeleted[action.meta.arg.id] = {
        ...state.flashcardsIncludingDeleted[action.meta.arg.id],
        ...action.payload,
      };
      state.updatePending[action.meta.arg.id] = `SUCCESS`;
    });
    builder.addCase(updateFlashcard.rejected, (state, action) => {
      state.updatePending[action.meta.arg.id] = `ERROR`;
    });
  },
});

// export const { pending, success, failure } = flashcardsSlice.actions;

export const selectFlashcardsIncludingDeleted = (state: RootState) =>
  state.flashcards.flashcardsIncludingDeleted;
export const selectFlashcardsLoading = (state: RootState) => state.flashcards.loading;

export const flashcardsSliceReducer = flashcardsSlice.reducer;
