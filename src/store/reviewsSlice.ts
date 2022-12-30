import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { createReview as createReviewFirestore, fetchReviews } from "src/firebase";
import { FirestoreReviewUserInput } from "src/firebase/firestore/types";
import { convertComputedFields } from "src/utils/firestore";

import { StateReview } from "./types";

import type { RootState } from "./";

export interface ReviewsState {
  reviews: Record<string, StateReview>;
  loading: null | "PENDING" | "SUCCESS" | "ERROR";
}

const initialState: ReviewsState = {
  reviews: {},
  loading: null,
};

export const fetchReviewsThunk = createAsyncThunk(`reviews/fetch`, async () => {
  const firestoreReviews = await fetchReviews();
  const data: Record<string, StateReview> = {};
  for (const [id, firestoreReview] of Object.entries(firestoreReviews)) {
    data[id] = convertComputedFields(firestoreReview);
  }
  return data;
});

export const createReview = createAsyncThunk(
  `reviews/create`,
  async ({ data }: { data: FirestoreReviewUserInput }) => {
    const [id, firestoreReview] = await createReviewFirestore(data);
    return [id, convertComputedFields(firestoreReview)] as const;
  },
);

export const reviewsSlice = createSlice({
  name: `reviews`,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchReviewsThunk.pending, (state) => {
      state.loading = `PENDING`;
    });
    builder.addCase(fetchReviewsThunk.fulfilled, (state, action) => {
      state.reviews = action.payload;
      state.loading = `SUCCESS`;
    });
    builder.addCase(fetchReviewsThunk.rejected, (state) => {
      state.loading = `ERROR`;
    });
    builder.addCase(createReview.fulfilled, (state, action) => {
      state.reviews[action.payload[0]] = action.payload[1];
    });
  },
});

export const selectReviews = (state: RootState) => state.reviews.reviews;
export const selectReviewsLoading = (state: RootState) => state.reviews.loading;

export const reviewsSliceReducer = reviewsSlice.reducer;
