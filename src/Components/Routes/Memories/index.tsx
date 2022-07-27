import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

import { ListOfMemories } from "@Components/ListOfMemories";

export const Memories = () => {
  const [searchTerm, setSearchTerm] = useState(``);

  return (
    <>
      <div className="basis-96 shrink-0">
        <div className="flex">
          <input
            className="border border-black grow"
            type="text"
            value={searchTerm}
            onChange={(x) => setSearchTerm(x.target.value)}
          />
          <Link to="/memories">New</Link>
        </div>
        <ListOfMemories />
      </div>
      <div>
        <Outlet />
      </div>
    </>
  );
};
