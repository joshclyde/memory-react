import { Route, Routes } from "react-router-dom";

import { MenuBar } from "src/components/MenuBar";
import { Home } from "src/components/Routes/Home";
import { Memories } from "src/components/Routes/Memories";
import { ExistingMemory } from "src/components/Routes/Memories/ExistingMemory";
import { NewMemory } from "src/components/Routes/Memories/NewMemory";
import { Tags } from "src/components/Routes/Tags";
import { useStartAuthListener } from "src/store/useStartAuthListener";

export const App = () => {
  useStartAuthListener();

  return (
    <div className="flex">
      <MenuBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="memories" element={<Memories />}>
          <Route path=":memoryId" element={<ExistingMemory />} />
          <Route index={true} element={<NewMemory />} />
        </Route>
        <Route path="tags" element={<Tags />} />
      </Routes>
    </div>
  );
};
