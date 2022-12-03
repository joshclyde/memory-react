import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";

import { authSliceReducer } from "./authSlice";
import { flashcardsSliceReducer } from "./flashcardsSlice";
import { tagsSliceReducer } from "./tagsSlice";

export const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    flashcards: flashcardsSliceReducer,
    tags: tagsSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
