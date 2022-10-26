# Firestore

## Look into

- Firestore Converter: https://firebase.google.com/docs/reference/js/v8/firebase.firestore.FirestoreDataConverter
- Full-text-search: https://firebase.google.com/docs/firestore/solutions/search
  - possibility when searching for memories based off a string
- Schedule Data Exports: https://firebase.google.com/docs/firestore/solutions/schedule-export
  - could be a solution for creating backups

## What about deletes?

Well, I implemented a caching solution so that I'm not reading documents from firestore all the time. However, i did not think about how I will handle deletes.

For now, I'm thinking the easiest solution will be to have a "deleted" field for a document. Long-term though, I'd want to fully remove the document from firestore to save on amount of storage.

## Features to keep in mind

Infinite studying. Instead of studying a specific tag, the user can do infinite studying, which is basically studying all of the user's flashcards in an infinite loop. How can I accomplish this without pulling all the flashcards at once?

Searching flashcards. The user should be able to search through their flashcards based off some query. Could be based off a tag, a phrase, date created. I don't need to show every single result at once, probably just enough to be displayed on the user's screen (maybe like 10ish).

When learning memories, ordering of the memories displayed to the user could be limited depending on whether I am querying for all of the memories at once or iteratively querying them.
