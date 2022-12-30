import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  createFlashcard as createFlashcardFirestore,
  deleteFlashcard as deleteFlashcardFirestore,
  fetchFlashcards,
  updateFlashcard as updateFlashcardFirestore,
} from "src/firebase";
import { FirestoreFlashcardUserInput } from "src/firebase/firestore/types";
import { convertComputedFields, convertLastModified } from "src/utils/firestore";

import { StateFlashcard } from "./types";

import type { RootState } from "./";

export interface FlashcardsState {
  flashcardsIncludingDeleted: Record<string, StateFlashcard>;
  loading: null | "PENDING" | "SUCCESS" | "ERROR";
  updatePending: Record<string, "PENDING" | "SUCCESS" | "ERROR">;
  deletePending: Record<string, "PENDING" | "SUCCESS" | "ERROR">;
}

const initialState: FlashcardsState = {
  flashcardsIncludingDeleted: {},
  loading: null,
  updatePending: {},
  deletePending: {},
};

export const fetchFlashcardsThunk = createAsyncThunk(`flashcards/fetch`, async () => {
  const firestoreFlashcards = await fetchFlashcards();
  const data: Record<string, StateFlashcard> = {};
  for (const [id, firestoreFlashcard] of Object.entries(firestoreFlashcards)) {
    data[id] = convertComputedFields(firestoreFlashcard);
  }
  return data;
});

export const createFlashcard = createAsyncThunk(
  `flashcards/create`,
  async ({ data }: { data: FirestoreFlashcardUserInput }) => {
    const [id, firestoreFlashcard] = await createFlashcardFirestore(data);
    return [id, convertComputedFields(firestoreFlashcard)] as const;
  },
);

export const updateFlashcard = createAsyncThunk(
  `flashcards/update`,
  async ({ id, data }: { id: string; data: FirestoreFlashcardUserInput }) => {
    const firestoreFlashcard = await updateFlashcardFirestore(id, data);
    return convertLastModified(firestoreFlashcard);
  },
);

export const deleteFlashcard = createAsyncThunk(
  `flashcards/delete`,
  async (id: string) => {
    const firestoreFlashcard = await deleteFlashcardFirestore(id);
    return convertLastModified(firestoreFlashcard);
  },
);

export const flashcardsSlice = createSlice({
  name: `flashcards`,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFlashcardsThunk.pending, (state) => {
      state.loading = `PENDING`;
    });
    builder.addCase(fetchFlashcardsThunk.fulfilled, (state, action) => {
      state.flashcardsIncludingDeleted = action.payload;
      state.loading = `SUCCESS`;
    });
    builder.addCase(fetchFlashcardsThunk.rejected, (state) => {
      state.loading = `ERROR`;
    });
    builder.addCase(createFlashcard.fulfilled, (state, action) => {
      state.flashcardsIncludingDeleted[action.payload[0]] = action.payload[1];
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
    builder.addCase(deleteFlashcard.pending, (state, action) => {
      state.deletePending[action.meta.arg] = `PENDING`;
    });
    builder.addCase(deleteFlashcard.fulfilled, (state, action) => {
      state.flashcardsIncludingDeleted[action.meta.arg] = {
        ...state.flashcardsIncludingDeleted[action.meta.arg],
        ...action.payload,
      };
      state.deletePending[action.meta.arg] = `SUCCESS`;
    });
    builder.addCase(deleteFlashcard.rejected, (state, action) => {
      state.deletePending[action.meta.arg] = `ERROR`;
    });
  },
});

// export const { pending, success, failure } = flashcardsSlice.actions;

export const selectFlashcardsIncludingDeleted = (state: RootState) =>
  state.flashcards.flashcardsIncludingDeleted;
export const selectFlashcardsLoading = (state: RootState) => state.flashcards.loading;

export const flashcardsSliceReducer = flashcardsSlice.reducer;
