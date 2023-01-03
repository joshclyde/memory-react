import { startFirebaseEventListening } from "src/firebase/core";

import { pending, success } from "./authSlice";
import { clearFlashcardData, fetchFlashcardsThunk } from "./flashcardsSlice";
import { clearReviewData, fetchReviewsThunk } from "./reviewsSlice";
import { clearTagData, fetchTagsThunk } from "./tagsSlice";

import { useAppDispatch } from "./index";

let isListening = false;
export const useStartAuthListener = () => {
  const dispatch = useAppDispatch();
  if (!isListening) {
    isListening = true;
    dispatch(pending());
    startFirebaseEventListening(
      async ({ uid }) => {
        dispatch(fetchFlashcardsThunk());
        dispatch(fetchTagsThunk());
        dispatch(fetchReviewsThunk());
        dispatch(success({ uid }));
      },
      () => {
        dispatch(success({ uid: null }));
        dispatch(clearFlashcardData());
        dispatch(clearTagData());
        dispatch(clearReviewData());
      },
    );
  }
};
