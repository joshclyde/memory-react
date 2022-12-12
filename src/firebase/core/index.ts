import {
  GoogleAuthProvider,
  signInWithRedirect,
  signOut as authSignOut,
} from "firebase/auth";
import type { User } from "firebase/auth";

import { auth } from "../app";

export const signInUserThroughGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithRedirect(auth, provider);
};

export const signOutUser = async () => {
  try {
    await authSignOut(auth);
  } catch (error) {
    console.log(error);
  }
};

export const getCurrentUser = () => auth.currentUser;
export const getCurrentUserUID = () => getCurrentUser()?.uid;
export const throwOrGetCurrentUserUID = () => {
  const uid = getCurrentUser()?.uid;
  if (uid != null && uid.length > 0) {
    return uid;
  }
  throw new Error(`UID was either nully or had a length of zero!`);
};
export const getIsUserSignedIn = () => Boolean(getCurrentUser());
export const consoleLogCurrentUser = () => console.log(getCurrentUser()?.uid);

/*
  Firebase Documentation

  Get the currently signed-in user: https://firebase.google.com/docs/auth/web/manage-users#get_the_currently_signed-in_user

  This is the magic way for us to know whether or not the user is signed in.
  Before the callback is called we should assume that authentication is still loading.
  On the first callback call is when authentication has finished loading and we know
  whether the user is authenticated or not.
*/
export const startFirebaseEventListening = (
  onAuthStateSignedIn: (user: User) => void,
  onAuthStateSignedOut: () => void,
) =>
  new Promise<void>((resolve) => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        onAuthStateSignedIn(user);
      } else {
        onAuthStateSignedOut();
      }
      resolve();
    });
  });
