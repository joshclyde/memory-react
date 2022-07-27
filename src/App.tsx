import { Routes, Route, Link } from "react-router-dom";

import { Home } from "@Components/Routes/Home";
import { Memories } from "@Components/Routes/Memories";
import { ExistingMemory } from "@Components/Routes/Memories/ExistingMemory";
import { NewMemory } from "@Components/Routes/Memories/NewMemory";
import { Tags } from "@Components/Routes/Tags";

export const App = () => {
  return (
    <div className="flex">
      <div className="basis-24 shrink-0 flex flex-col">
        <Link to="/">Learn</Link>
        <Link to="/memories">Memories</Link>
        <Link to="/tags">Tags</Link>
      </div>
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
