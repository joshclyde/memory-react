import { Outlet } from "react-router-dom";

import { ListOfTags } from "src/components/ListOfTags";

export const Tags = () => {
  return (
    <>
      <ListOfTags />
      <div className="bg-dark-2 w-full">
        <Outlet />
      </div>
    </>
  );
};
