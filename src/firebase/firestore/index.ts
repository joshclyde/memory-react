import { doc, collection } from "firebase/firestore";

import { throwOrGetCurrentUserUID } from "../core";

import {
  FirestoreTag,
  FirestoreTagUserInput,
  FirestoreFlashcard,
  FirestoreFlashcardUserInput,
} from "./types";
import {
  createDocument,
  updateDocument,
  db,
  fetchCollection,
  deleteDocument,
} from "./utils";

/*
  TODO:

  should I be accesing uid within these functions? or should I have the
  functions in Pinia pass in the Pinia stat's uid?

  I could make this whole thing a class.
*/
const getTagsCollectionRef = () =>
  collection(db, `/users/${throwOrGetCurrentUserUID()}/tags`);

const getTagsDocumentRef = (tagId: string) =>
  doc(db, `/users/${throwOrGetCurrentUserUID()}/tags/${tagId}`);

const getFlashcardsCollectionRef = () =>
  collection(db, `/users/${throwOrGetCurrentUserUID()}/flashcards`);

const getFlashcardsDocumentRef = (flashcardId: string) =>
  doc(db, `/users/${throwOrGetCurrentUserUID()}/flashcards/${flashcardId}`);

export const createTag = async (
  data: FirestoreTagUserInput,
): Promise<readonly [string, FirestoreTag]> =>
  createDocument(getTagsCollectionRef(), data);

export const createFlashcard = (
  data: FirestoreFlashcardUserInput,
): Promise<readonly [string, FirestoreFlashcard]> =>
  createDocument(getFlashcardsCollectionRef(), data);

export const updateTag = (
  id: string,
  data: FirestoreTagUserInput,
): Promise<Omit<FirestoreTag, "createdDate">> =>
  updateDocument(getTagsDocumentRef(id), data);

export const updateFlashcard = (
  id: string,
  data: FirestoreFlashcardUserInput,
): Promise<Omit<FirestoreFlashcard, "createdDate">> =>
  updateDocument(getFlashcardsDocumentRef(id), data);

export const deleteTag = (
  id: string,
): Promise<Pick<FirestoreTag, "isDeleted" | "lastModified">> =>
  deleteDocument(getTagsDocumentRef(id));

export const deleteFlashcard = (
  id: string,
): Promise<Pick<FirestoreFlashcard, "isDeleted" | "lastModified">> =>
  deleteDocument(getFlashcardsDocumentRef(id));

export const fetchTags = async () => {
  const { fromCache, fromServer } = await fetchCollection(getTagsCollectionRef());

  const tags: Record<string, FirestoreTag> = {};
  [fromCache, fromServer].forEach((snapshot) => {
    snapshot?.forEach((_doc) => {
      // _doc.data() is never undefined for query doc snapshots
      tags[_doc.id] = {
        name: _doc.data().name,
        isDeleted: _doc.data().isDeleted,
        createdDate: _doc.data().createdDate,
        lastModified: _doc.data().lastModified,
      };
    });
  });
  return tags;
};

export const fetchFlashcards = async () => {
  const { fromCache, fromServer } = await fetchCollection(getFlashcardsCollectionRef());

  const flashcards: Record<string, FirestoreFlashcard> = {};
  [fromCache, fromServer].forEach((snapshot) => {
    snapshot?.forEach((_doc) => {
      // _doc.data() is never undefined for query doc snapshots
      flashcards[_doc.id] = {
        front: _doc.data().front,
        back: _doc.data().back,
        tags: _doc.data().tags,
        isDeleted: _doc.data().isDeleted,
        createdDate: _doc.data().createdDate,
        lastModified: _doc.data().lastModified,
      };
    });
  });
  return flashcards;
};

export * from "./review";
