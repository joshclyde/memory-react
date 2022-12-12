import { Timestamp } from "firebase/firestore";

import { FirestoreComputedFields } from "src/firebase/firestore/types";

export const convertTimestampToString = (timestamp: Timestamp) =>
  timestamp.toDate().toString();

export const convertLastModified = <
  T extends { lastModified: FirestoreComputedFields["lastModified"] },
>(
  data: T,
) => {
  return {
    ...data,
    lastModified: convertTimestampToString(data.lastModified),
  };
};

export const convertComputedFields = <T extends FirestoreComputedFields>(data: T) => {
  return {
    ...data,
    createdDate: convertTimestampToString(data.createdDate),
    lastModified: convertTimestampToString(data.lastModified),
  };
};
