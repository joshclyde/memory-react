import {
  addDoc,
  updateDoc,
  DocumentReference,
  CollectionReference,
  initializeFirestore,
  enableMultiTabIndexedDbPersistence,
  CACHE_SIZE_UNLIMITED,
  getDocsFromServer,
  getDocsFromCache,
  Timestamp,
  query,
  where,
  QuerySnapshot,
} from "firebase/firestore";

import { app } from "../app";

export const database = initializeFirestore(app, {
  cacheSizeBytes: CACHE_SIZE_UNLIMITED,
});

const enableCache = enableMultiTabIndexedDbPersistence(database);

export const createDocument = async <T extends object>(
  collectionReference: CollectionReference,
  data: T,
) => {
  await enableCache;

  const fullData = {
    ...data,
    createdDate: Timestamp.now(),
    lastModified: Timestamp.now(),
  };
  const documentReference = await addDoc(collectionReference, fullData);
  return <const>[documentReference.id, fullData];
};

export const updateDocument = async <T extends object>(
  documentReference: DocumentReference,
  data: T,
) => {
  await enableCache;

  const fullData = {
    ...data,
    lastModified: Timestamp.now(),
  };
  await updateDoc(documentReference, fullData);
  return fullData;
};

export const deleteDocument = async (documentReference: DocumentReference) => {
  await enableCache;

  const fullData = {
    isDeleted: true,
    lastModified: Timestamp.now(),
  };
  await updateDoc(documentReference, fullData);
  return fullData;
};

/*
  1.  Fetch all documents from cache
  2a. If there were no documents in cache, fetch all documents from the server
  2b. If there were documents in cache, fetch all documents with a more recent lastModified
  3.  [Future Possibility] Listen for any new changes to the collection
*/
export const fetchCollection = async (collectionReference: CollectionReference) => {
  await enableCache;

  const snapshots: {
    fromCache?: QuerySnapshot;
    fromServer?: QuerySnapshot;
  } = {};

  try {
    snapshots.fromCache = await getDocsFromCache(collectionReference);
    // eslint-disable-next-line no-console
    console.log(
      `Found ${snapshots.fromCache.size} cached documents for ${collectionReference.path}`,
    );
  } catch (error) {
    /*
      TODO:

      The docs say "Returns an error if the document is not currently cached."
      Since I'm querying for collections, if the collection does not exist yet
      in cache will that throw an error?
    */
    // eslint-disable-next-line no-console
    console.log(`Failed to get docs from cache for ${collectionReference.path}`);
    // eslint-disable-next-line no-console
    console.error(error);
    throw error;
  }

  if (!snapshots.fromCache || snapshots.fromCache.size === 0) {
    // If there was no cache, fetch all documents from the server
    snapshots.fromServer = await getDocsFromServer(collectionReference);
    // eslint-disable-next-line no-console
    console.log(
      `There were no documents in the cache, so fetched all ${snapshots.fromServer.size} documents for ${collectionReference.path}.`,
    );
  } else {
    // If there was a cache, for each collection, fetch all documents with a more recent lastModified
    let mostRecentLastModified: Timestamp | undefined;
    snapshots.fromCache.forEach((_document) => {
      const { lastModified } = _document.data();
      if (!mostRecentLastModified || lastModified > mostRecentLastModified) {
        mostRecentLastModified = lastModified;
      }
    });
    snapshots.fromServer = await getDocsFromServer(
      query(collectionReference, where(`lastModified`, `>`, mostRecentLastModified)),
    );
    // eslint-disable-next-line no-console
    console.log(
      `Fetched ${snapshots.fromServer.size} documents for ${collectionReference.path} that were not updated in the cache.`,
    );
  }

  return snapshots;
};
