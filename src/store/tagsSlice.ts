import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import {
  createTag as createTagFirestore,
  updateTag as updateTagFirestore,
  deleteTag as deleteTagFirestore,
  fetchTags,
} from "src/firebase";
import { FirestoreTagUserInput } from "src/firebase/firestore/types";
import { convertComputedFields, convertLastModified } from "src/utils/firestore";

import { StateTag } from "./types";

import type { RootState } from "./";

export interface TagsState {
  tagsIncludingDeleted: Record<string, StateTag>;
  loading: null | "PENDING" | "SUCCESS" | "ERROR";
  updatePending: Record<string, "PENDING" | "SUCCESS" | "ERROR">;
  deletePending: Record<string, "PENDING" | "SUCCESS" | "ERROR">;
}

const initialState: TagsState = {
  tagsIncludingDeleted: {},
  loading: null,
  updatePending: {},
  deletePending: {},
};

export const fetchTagsThunk = createAsyncThunk(`tags/fetch`, async () => {
  const firestoreTags = await fetchTags();
  let data: Record<string, StateTag> = {};
  Object.entries(firestoreTags).forEach(([id, firestoreTag]) => {
    data[id] = convertComputedFields(firestoreTag);
  });
  return data;
});

export const createTag = createAsyncThunk(
  `tags/create`,
  async ({ data }: { data: FirestoreTagUserInput }) => {
    const [id, firestoreTag] = await createTagFirestore(data);
    return [id, convertComputedFields(firestoreTag)] as const;
  },
);

export const updateTag = createAsyncThunk(
  `tags/update`,
  async ({ id, data }: { id: string; data: FirestoreTagUserInput }) => {
    const firestoreTag = await updateTagFirestore(id, data);
    return convertLastModified(firestoreTag);
  },
);

export const deleteTag = createAsyncThunk(`tags/delete`, async (id: string) => {
  const firestoreTag = await deleteTagFirestore(id);
  return convertLastModified(firestoreTag);
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
    builder.addCase(createTag.fulfilled, (state, action) => {
      state.tagsIncludingDeleted[action.payload[0]] = action.payload[1];
    });
    builder.addCase(updateTag.pending, (state, action) => {
      state.updatePending[action.meta.arg.id] = `PENDING`;
    });
    builder.addCase(updateTag.fulfilled, (state, action) => {
      state.tagsIncludingDeleted[action.meta.arg.id] = {
        ...state.tagsIncludingDeleted[action.meta.arg.id],
        ...action.payload,
      };
      state.updatePending[action.meta.arg.id] = `SUCCESS`;
    });
    builder.addCase(updateTag.rejected, (state, action) => {
      state.updatePending[action.meta.arg.id] = `ERROR`;
    });
    builder.addCase(deleteTag.pending, (state, action) => {
      state.deletePending[action.meta.arg] = `PENDING`;
    });
    builder.addCase(deleteTag.fulfilled, (state, action) => {
      state.tagsIncludingDeleted[action.meta.arg] = {
        ...state.tagsIncludingDeleted[action.meta.arg],
        ...action.payload,
      };
      state.deletePending[action.meta.arg] = `SUCCESS`;
    });
    builder.addCase(deleteTag.rejected, (state, action) => {
      state.deletePending[action.meta.arg] = `ERROR`;
    });
  },
});

// export const { pending, success, failure } = flashcardsSlice.actions;

export const selectTagsIncludingDeleted = (state: RootState) =>
  state.tags.tagsIncludingDeleted;
export const selectTagsLoading = (state: RootState) => state.tags.loading;

export const tagsSliceReducer = tagsSlice.reducer;
