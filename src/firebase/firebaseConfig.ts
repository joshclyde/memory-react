/*
  TODO: figure out why auth was not working

  https://stackoverflow.com/questions/48681989/confusing-auth-domain-setting-in-firebase

  When I deployed to production, auth didn't really seem to be
  working for the https://memory-josh-clyde.web.app/ url, but
  for https://memory-josh-clyde.firebaseapp.com/ it does work.

  Idk why. But the authDomain here is for the firebaseapp url,
  so maybe that is affecting it somehow.
*/

export const firebaseConfig = {
  apiKey: `AIzaSyDW2iLG7VVcRii6V8dT20NtlyFSAqzu5zA`,
  authDomain: `memory-josh-clyde.firebaseapp.com`,
  databaseURL: `https://memory-josh-clyde-default-rtdb.firebaseio.com`,
  projectId: `memory-josh-clyde`,
  storageBucket: `memory-josh-clyde.appspot.com`,
  messagingSenderId: `968343289882`,
  appId: `1:968343289882:web:59e8c6b6560c8fd70251a3`,
  measurementId: `G-668CH9FZ8Q`,
};
