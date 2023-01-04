import { Route, Routes } from "react-router-dom";

import { ResettingExistingMemory } from "src/components/Routes/Memories/ExistingMemory";
import { NewMemory } from "src/components/Routes/Memories/NewMemory";
import { useAppSelector } from "src/store";
import { useStartAuthListener } from "src/store/useStartAuthListener";

import { LayoutLeft } from "./Design/LayoutLeft";
import { WholeView } from "./Design/LayoutRight";
import { ListOfMemories } from "./ListOfMemories";
import { ListOfTags } from "./ListOfTags";
import { Learn } from "./Routes/Learn";
import { NoMemory } from "./Routes/Memories/NoMemory";
import { ResettingExistingTag } from "./Routes/Tags/ExistingTag";
import { NewTag } from "./Routes/Tags/NewTag";
import { NoTag } from "./Routes/Tags/NoTag";

const Two = () => {
  return (
    <Routes>
      <Route path="memories">
        <Route
          index={true}
          element={
            <LayoutLeft className="w-full md:basis-48 lg:basis-96">
              <ListOfMemories />
            </LayoutLeft>
          }
        />
        <Route
          path="*"
          element={
            <LayoutLeft className="hidden md:flex md:basis-48 lg:basis-96">
              <ListOfMemories />
            </LayoutLeft>
          }
        />
      </Route>
      <Route path="tags">
        <Route
          index={true}
          element={
            <LayoutLeft className="w-full md:basis-48 lg:basis-96">
              <ListOfTags />
            </LayoutLeft>
          }
        />
        <Route
          path="*"
          element={
            <LayoutLeft className="hidden md:flex md:basis-48 lg:basis-96">
              <ListOfTags />
            </LayoutLeft>
          }
        />
      </Route>
    </Routes>
  );
};

const Three = () => {
  return (
    <Routes>
      <Route path="memories">
        <Route
          index={true}
          element={
            <WholeView className="hidden md:flex items-center justify-center">
              <NoMemory />
            </WholeView>
          }
        />
        <Route
          path="new"
          element={
            <WholeView>
              <NewMemory />
            </WholeView>
          }
        />
        <Route
          path=":memoryId"
          element={
            <WholeView>
              <ResettingExistingMemory />
            </WholeView>
          }
        />
      </Route>
      <Route path="tags">
        <Route
          index={true}
          element={
            <WholeView className="hidden md:flex items-center justify-center">
              <NoTag />
            </WholeView>
          }
        />
        <Route
          path="new"
          element={
            <WholeView>
              <NewTag />
            </WholeView>
          }
        />
        <Route
          path=":tagId"
          element={
            <WholeView>
              <ResettingExistingTag />
            </WholeView>
          }
        />
      </Route>
      <Route path="learn">
        <Route
          path=":tagId"
          element={
            <WholeView>
              <Learn />
            </WholeView>
          }
        />
      </Route>
    </Routes>
  );
};

export const App = () => {
  useStartAuthListener();
  const { isAuthenticated, authLoading, flashcardsLoding, tagsLoading, reviewsLoading } =
    useAppSelector((state) => {
      return {
        isAuthenticated: state.auth.isAuthenticated,
        authLoading: state.auth.loading,
        flashcardsLoding: state.flashcards.loading,
        tagsLoading: state.tags.loading,
        reviewsLoading: state.reviews.loading,
      };
    });

  if (
    authLoading === `PENDING` ||
    (isAuthenticated &&
      (flashcardsLoding === `PENDING` ||
        tagsLoading === `PENDING` ||
        reviewsLoading === `PENDING`))
  ) {
    return <p>Not ready yet</p>;
  }

  if (isAuthenticated && flashcardsLoding === `ERROR`) {
    return <p>Failed to fetch flashcards</p>;
  }

  if (isAuthenticated && tagsLoading === `ERROR`) {
    return <p>Failed to fetch flashcards</p>;
  }

  if (isAuthenticated && reviewsLoading === `ERROR`) {
    return <p>Failed to fetch reviews</p>;
  }

  return (
    <div className="flex">
      <Two />
      <Three />
    </div>
  );
};
