import React from "react";
import { IconType } from "react-icons";
import {
  HiBookOpen,
  HiLogin,
  HiLogout,
  HiOutlineBookOpen,
  HiOutlineTag,
  HiTag,
} from "react-icons/hi";
import { NavLink } from "react-router-dom";

import { signInUserThroughGoogle, signOutUser } from "src/firebase";
import { useAppSelector } from "src/store";

const MenuLink = ({
  to,
  children,
  Icon,
  ActiveIcon,
}: {
  to: string;
  children: React.ReactNode;
  Icon: IconType;
  ActiveIcon: IconType;
}) => {
  return (
    <NavLink to={to} className="flex items-center py-1">
      {({ isActive }) => (
        <>
          {isActive ? <ActiveIcon className="mr-4" /> : <Icon className="mr-4" />}
          {children}
        </>
      )}
    </NavLink>
  );
};

const MenuButton = ({
  onClick,
  children,
  Icon,
}: {
  onClick: () => void;
  children: React.ReactNode;
  Icon: IconType;
}) => {
  return (
    <button type="button" onClick={onClick} className="flex items-center py-1">
      <Icon className="mr-4" />
      {children}
    </button>
  );
};

export const MenuBar = ({ className }: { className?: string }) => {
  const loading = useAppSelector((state) => state.auth.loading);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  return (
    <div className={`flex basis-48 shrink-0 flex-col text-blue-1 p-4 ${className}`}>
      <MenuLink to="/memories" ActiveIcon={HiBookOpen} Icon={HiOutlineBookOpen}>
        Memories
      </MenuLink>
      <MenuLink to="/tags" ActiveIcon={HiTag} Icon={HiOutlineTag}>
        Tags
      </MenuLink>
      {loading === `SUCCESS` && !isAuthenticated && (
        <MenuButton onClick={() => signInUserThroughGoogle()} Icon={HiLogin}>
          Login
        </MenuButton>
      )}
      {loading === `SUCCESS` && isAuthenticated && (
        <MenuButton onClick={() => signOutUser()} Icon={HiLogout}>
          Logout
        </MenuButton>
      )}
    </div>
  );
};
