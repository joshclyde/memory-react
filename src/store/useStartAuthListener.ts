import { startFirebaseEventListening } from "src/firebase/core";

import { failure, pending, success } from "./authSlice";

import { useAppDispatch } from "./index";

let isListening = false;
export const useStartAuthListener = () => {
  const dispatch = useAppDispatch();
  if (!isListening) {
    isListening = true;
    dispatch(pending());
    startFirebaseEventListening(
      async ({ uid }) => {
        dispatch(success({ uid }));
      },
      () => {
        dispatch(success({ uid: null }));
      },
    );
  }
};
