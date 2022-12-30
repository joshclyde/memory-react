import { collection } from "firebase/firestore";

import { throwOrGetCurrentUserUID } from "../core";

import { FirestoreReview, FirestoreReviewUserInput } from "./types";
import { createDocument, database, fetchCollection } from "./utils";

const getReviewCollectionReference = () =>
  collection(database, `/users/${throwOrGetCurrentUserUID()}/review`);

export const createReview = (
  data: FirestoreReviewUserInput,
): Promise<readonly [string, FirestoreReview]> =>
  createDocument(getReviewCollectionReference(), data);

export const fetchReviews = async () => {
  const { fromCache, fromServer } = await fetchCollection(getReviewCollectionReference());

  const reviews: Record<string, FirestoreReview> = {};
  [fromCache, fromServer].forEach((snapshot) => {
    snapshot?.forEach((_document) => {
      // _doc.data() is never undefined for query doc snapshots
      reviews[_document.id] = {
        result: _document.data().result,
        memoryId: _document.data().memoryId,
        createdDate: _document.data().createdDate,
        lastModified: _document.data().lastModified,
      };
    });
  });
  return reviews;
};
