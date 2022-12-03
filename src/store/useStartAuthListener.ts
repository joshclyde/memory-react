import { startFirebaseEventListening } from "src/firebase/core";

import { pending, success } from "./authSlice";
import { fetchFlashcardsThunk } from "./flashcardsSlice";
import { fetchTagsThunk } from "./tagsSlice";

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
        dispatch(success({ uid }));
      },
      () => {
        dispatch(success({ uid: null }));
      },
    );
  }
};
