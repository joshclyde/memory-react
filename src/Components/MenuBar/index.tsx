import React from "react";
import {
  HiHome,
  HiTag,
  HiBookOpen,
  HiLogin,
  HiLogout,
  HiOutlineHome,
  HiOutlineBookOpen,
  HiOutlineTag,
} from "react-icons/hi";
import { Link, Route, Routes } from "react-router-dom";

import { signInUserThroughGoogle, signOutUser } from "@/firebase";
import { useAppSelector } from "@/store";

const MenuLink = ({ to, children }: { to: string; children: React.ReactNode }) => {
  return (
    <Link to={to} className="flex items-center py-1">
      {children}
    </Link>
  );
};

const MenuButton = ({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) => {
  return (
    <button type="button" onClick={onClick} className="flex items-center py-1">
      {children}
    </button>
  );
};

export const MenuBar = () => {
  const loading = useAppSelector(state => state.auth.loading);
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);

  return (
    <div className="basis-48 shrink-0 flex flex-col text-blue-1 p-4">
      <MenuLink to="/">
        <Routes>
          <Route path="/" element={<HiHome className="mr-4" />} />
          <Route path="*" element={<HiOutlineHome className="mr-4" />} />
        </Routes>
        Learn
      </MenuLink>
      <MenuLink to="/memories">
        <Routes>
          <Route path="/memories/*" element={<HiBookOpen className="mr-4" />} />
          <Route path="*" element={<HiOutlineBookOpen className="mr-4" />} />
        </Routes>
        Memories
      </MenuLink>
      <MenuLink to="/tags">
        <Routes>
          <Route path="/tags/*" element={<HiTag className="mr-4" />} />
          <Route path="*" element={<HiOutlineTag className="mr-4" />} />
        </Routes>
        Tags
      </MenuLink>
      {loading === `SUCCESS` && !isAuthenticated && <MenuButton onClick={() => signInUserThroughGoogle()}>
        <HiLogin className="mr-4" />
        Login
      </MenuButton>}
      {loading === `SUCCESS` && isAuthenticated && <MenuButton onClick={() => signOutUser()}>
        <HiLogout className="mr-4" />
        Logout
      </MenuButton>}
    </div>
  );
};
