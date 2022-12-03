import { Route, Routes } from "react-router-dom";

import { MenuBar } from "src/components/MenuBar";
import { Home } from "src/components/Routes/Home";
import { Memories } from "src/components/Routes/Memories";
import { ExistingMemory } from "src/components/Routes/Memories/ExistingMemory";
import { NewMemory } from "src/components/Routes/Memories/NewMemory";
import { Tags } from "src/components/Routes/Tags";
import { useStartAuthListener } from "src/store/useStartAuthListener";

import { useAppSelector } from "./store";

export const App = () => {
  useStartAuthListener();
  const { isAuthenticated, authLoading, flashcardsLoding } = useAppSelector((state) => {
    return {
      isAuthenticated: state.auth.isAuthenticated,
      authLoading: state.auth.loading,
      flashcardsLoding: state.flashcards.loading,
    };
  });

  if (authLoading === `PENDING` || isAuthenticated && flashcardsLoding === `PENDING`) {
    return `Not ready yet`;
  }

  if (isAuthenticated && flashcardsLoding === `ERROR`) {
    return `Failed to fetch flashcards`
  }

  return (
    <div className="flex">
      <MenuBar />
      <Routes>
        {isAuthenticated ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="memories" element={<Memories />}>
              <Route path=":memoryId" element={<ExistingMemory />} />
              <Route index={true} element={<NewMemory />} />
            </Route>
            <Route path="tags" element={<Tags />} />
          </>
        ) : (
          <Route path="*" element={<div>Not logged in</div>} />
        )}
      </Routes>
    </div>
  );
};
