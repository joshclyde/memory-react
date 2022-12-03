import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import {
  createFlashcard,
  updateFlashcard,
  fetchFlashcards,
  deleteFlashcard,
  fetchTags,
} from "src/firebase";
import { convertComputedFields, convertLastModified } from "src/utils/firestore";

import { StateTag } from "./types";

import type { RootState } from "./";

export interface TagsState {
  tagsIncludingDeleted: Record<string, StateTag>;
  loading: null | "PENDING" | "SUCCESS" | "ERROR";
}

const initialState: TagsState = { tagsIncludingDeleted: {}, loading: null };

export const fetchTagsThunk = createAsyncThunk(`tags/fetch`, async () => {
  const firestoreTags = await fetchTags();
  let data: Record<string, StateTag> = {};
  Object.entries(firestoreTags).forEach(([id, firestoreTag]) => {
    data[id] = convertComputedFields(firestoreTag);
  });
  return data;
});

export const tagsSlice = createSlice({
  name: `tags`,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTagsThunk.pending, (state, action) => {
      state.loading = `PENDING`;
    });
    builder.addCase(fetchTagsThunk.fulfilled, (state, action) => {
      state.tagsIncludingDeleted = action.payload;
      state.loading = `SUCCESS`;
    });
    builder.addCase(fetchTagsThunk.rejected, (state, action) => {
      state.loading = `ERROR`;
    });
  },
});

// export const { pending, success, failure } = flashcardsSlice.actions;

export const selectTagsIncludingDeleted = (state: RootState) =>
  state.tags.tagsIncludingDeleted;
export const selectTagsLoading = (state: RootState) =>
  state.tags.loading;

export const tagsSliceReducer = tagsSlice.reducer;
