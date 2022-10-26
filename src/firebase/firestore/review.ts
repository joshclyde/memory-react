import { collection } from "firebase/firestore";

import { throwOrGetCurrentUserUID } from "../core";

import { FirestoreReview, FirestoreReviewUserInput } from "./types";
import { createDocument, db, fetchCollection } from "./utils";

const getReviewCollectionRef = () =>
  collection(db, `/users/${throwOrGetCurrentUserUID()}/review`);

export const createReview = (
  data: FirestoreReviewUserInput
): Promise<readonly [string, FirestoreReview]> =>
  createDocument(getReviewCollectionRef(), data);

export const fetchReviews = async () => {
  const { fromCache, fromServer } = await fetchCollection(
    getReviewCollectionRef()
  );

  const reviews: Record<string, FirestoreReview> = {};
  [fromCache, fromServer].forEach((snapshot) => {
    snapshot?.forEach((_doc) => {
      // _doc.data() is never undefined for query doc snapshots
      reviews[_doc.id] = {
        result: _doc.data().result,
        memoryId: _doc.data().memoryId,
        createdDate: _doc.data().createdDate,
        lastModified: _doc.data().lastModified,
      };
    });
  });
  return reviews;
};
