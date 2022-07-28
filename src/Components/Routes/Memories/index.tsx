import { useState } from "react";
import { HiPlus } from "react-icons/hi";
import { Link, Outlet } from "react-router-dom";

import { ListOfMemories } from "@Components/ListOfMemories";

export const Memories = () => {
  const [searchTerm, setSearchTerm] = useState(``);

  return (
    <>
      <div className="basis-96 shrink-0 bg-dark-2 border-r border-dark-1 h-screen flex flex-col">
        <div className="flex p-2 items-center border-dark-1 border-b">
          <input
            className="border border-black grow bg-dark-2 border-blue-1 rounded-lg text-blue-1 pl-2 text-base"
            type="text"
            value={searchTerm}
            onChange={(x) => setSearchTerm(x.target.value)}
          />
          <Link to="/memories" className="ml-2 text-blue-1 border border-blue-1 rounded">
            <HiPlus />
          </Link>
        </div>
        <ListOfMemories />
      </div>
      <div className="bg-dark-2 w-full">
        <Outlet />
      </div>
    </>
  );
};
