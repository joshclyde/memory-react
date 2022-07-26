import { Route, Routes } from "react-router-dom";

import { MenuBar } from "src/components/Design/MenuBar";
import { Home } from "src/components/Routes/Home";
import { Memories } from "src/components/Routes/Memories";
import { ResettingExistingMemory } from "src/components/Routes/Memories/ExistingMemory";
import { NewMemory } from "src/components/Routes/Memories/NewMemory";
import { Tags } from "src/components/Routes/Tags";
import { useStartAuthListener } from "src/store/useStartAuthListener";

import { Learn } from "./components/Routes/Learn";
import { ResettingExistingTag } from "./components/Routes/Tags/ExistingTag";
import { NewTag } from "./components/Routes/Tags/NewTag";
import { useAppSelector } from "./store";

const Body = () => {
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
      (flashcardsLoding === `PENDING` || tagsLoading === `PENDING` || reviewsLoading === `PENDING`))
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
    <Routes>
      {isAuthenticated ? (
        <>
          <Route path="/" element={<Home />} />
          <Route path="memories" element={<Memories />}>
            <Route path=":memoryId" element={<ResettingExistingMemory />} />
            <Route index={true} element={<NewMemory />} />
          </Route>
          <Route path="tags" element={<Tags />}>
            <Route path=":tagId" element={<ResettingExistingTag />} />
            <Route index={true} element={<NewTag />} />
          </Route>
          <Route path="learn">
            <Route path=":tagId" element={<Learn />} />
          </Route>
        </>
      ) : (
        <Route path="*" element={<div>Not logged in</div>} />
      )}
    </Routes>
  );
};

export const App = () => {
  return (
    <div className="flex">
      <MenuBar />
      <Body />
    </div>
  );
};
