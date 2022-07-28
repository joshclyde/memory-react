import { Route, Routes } from "react-router-dom";

import { MenuBar } from "@Components/MenuBar";
import { Home } from "@Components/Routes/Home";
import { Memories } from "@Components/Routes/Memories";
import { ExistingMemory } from "@Components/Routes/Memories/ExistingMemory";
import { NewMemory } from "@Components/Routes/Memories/NewMemory";
import { Tags } from "@Components/Routes/Tags";

export const App = () => {
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
