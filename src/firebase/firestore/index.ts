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
  database,
  fetchCollection,
  deleteDocument,
} from "./utils";

/*
  TODO:

  should I be accesing uid within these functions? or should I have the
  functions in Pinia pass in the Pinia stat's uid?

  I could make this whole thing a class.
*/
const getTagsCollectionReference = () =>
  collection(database, `/users/${throwOrGetCurrentUserUID()}/tags`);

const getTagsDocumentReference = (tagId: string) =>
  doc(database, `/users/${throwOrGetCurrentUserUID()}/tags/${tagId}`);

const getFlashcardsCollectionReference = () =>
  collection(database, `/users/${throwOrGetCurrentUserUID()}/flashcards`);

const getFlashcardsDocumentReference = (flashcardId: string) =>
  doc(database, `/users/${throwOrGetCurrentUserUID()}/flashcards/${flashcardId}`);

export const createTag = async (
  data: FirestoreTagUserInput,
): Promise<readonly [string, FirestoreTag]> =>
  createDocument(getTagsCollectionReference(), data);

export const createFlashcard = (
  data: FirestoreFlashcardUserInput,
): Promise<readonly [string, FirestoreFlashcard]> =>
  createDocument(getFlashcardsCollectionReference(), data);

export const updateTag = (
  id: string,
  data: FirestoreTagUserInput,
): Promise<Omit<FirestoreTag, "createdDate">> =>
  updateDocument(getTagsDocumentReference(id), data);

export const updateFlashcard = (
  id: string,
  data: FirestoreFlashcardUserInput,
): Promise<Omit<FirestoreFlashcard, "createdDate">> =>
  updateDocument(getFlashcardsDocumentReference(id), data);

export const deleteTag = (
  id: string,
): Promise<Pick<FirestoreTag, "isDeleted" | "lastModified">> =>
  deleteDocument(getTagsDocumentReference(id));

export const deleteFlashcard = (
  id: string,
): Promise<Pick<FirestoreFlashcard, "isDeleted" | "lastModified">> =>
  deleteDocument(getFlashcardsDocumentReference(id));

export const fetchTags = async () => {
  const { fromCache, fromServer } = await fetchCollection(getTagsCollectionReference());

  const tags: Record<string, FirestoreTag> = {};
  [fromCache, fromServer].forEach((snapshot) => {
    snapshot?.forEach((_document) => {
      // _doc.data() is never undefined for query doc snapshots
      tags[_document.id] = {
        name: _document.data().name,
        isDeleted: _document.data().isDeleted,
        createdDate: _document.data().createdDate,
        lastModified: _document.data().lastModified,
      };
    });
  });
  return tags;
};

export const fetchFlashcards = async () => {
  const { fromCache, fromServer } = await fetchCollection(
    getFlashcardsCollectionReference(),
  );

  const flashcards: Record<string, FirestoreFlashcard> = {};
  [fromCache, fromServer].forEach((snapshot) => {
    snapshot?.forEach((_document) => {
      // _doc.data() is never undefined for query doc snapshots
      flashcards[_document.id] = {
        front: _document.data().front,
        back: _document.data().back,
        tags: _document.data().tags,
        isDeleted: _document.data().isDeleted,
        createdDate: _document.data().createdDate,
        lastModified: _document.data().lastModified,
      };
    });
  });
  return flashcards;
};

export * from "./review";
