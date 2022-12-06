import { Outlet } from "react-router-dom";

import { ListOfMemories } from "src/components/ListOfMemories";

export const Memories = () => {
  return (
    <>
      <ListOfMemories />
      <div className="bg-dark-2 w-full">
        <Outlet />
      </div>
    </>
  );
};
