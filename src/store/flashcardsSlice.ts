import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import {
  createFlashcard,
  updateFlashcard,
  fetchFlashcards,
  deleteFlashcard,
} from "src/firebase";
import { convertComputedFields, convertLastModified } from "src/utils/firestore";

import { StateFlashcard } from "./types";

import type { RootState } from "./";

export interface FlashcardsState {
  flashcardsIncludingDeleted: Record<string, StateFlashcard>;
  loading: null | "PENDING" | "SUCCESS" | "ERROR";
}

const initialState: FlashcardsState = { flashcardsIncludingDeleted: {}, loading: null };

export const fetchFlashcardsThunk = createAsyncThunk(`flashcards/fetch`, async () => {
  const firestoreFlashcards = await fetchFlashcards();
  let data: Record<string, StateFlashcard> = {};
  Object.entries(firestoreFlashcards).forEach(([id, firestoreFlashcard]) => {
    data[id] = convertComputedFields(firestoreFlashcard);
  });
  return data;
});

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
  },
});

// export const { pending, success, failure } = flashcardsSlice.actions;

export const selectFlashcardsIncludingDeleted = (state: RootState) =>
  state.flashcards.flashcardsIncludingDeleted;
export const selectFlashcardsLoading = (state: RootState) =>
  state.flashcards.loading;

export const flashcardsSliceReducer = flashcardsSlice.reducer;
