import React, { ComponentProps, ReactNode, useState } from "react";
import { IconType } from "react-icons";
import { HiOutlineMenuAlt1, HiSearch } from "react-icons/hi";
import { Link, NavLink } from "react-router-dom";

import { MenuBar } from "../MenuBar";

export const TopBarIconButton = ({
  onClick,
  className,
  Icon,
}: {
  onClick: ComponentProps<"button">["onClick"];
  className?: string;
  Icon: IconType;
}) => {
  return (
    <button type="button" onClick={onClick} className={className}>
      <Icon size="1.25em" className="text-blue-1" />
    </button>
  );
};

export const TopBarIconLink = ({
  className,
  to,
  Icon,
}: {
  className?: string;
  to: ComponentProps<typeof Link>["to"];
  Icon: IconType;
}) => {
  return (
    <Link to={to} className={className}>
      <Icon size="1.25em" className="text-blue-1" />
    </Link>
  );
};

export const TopBar = ({
  title,
  left,
  right,
  children,
  className,
}: {
  title?: string;
  left?: ReactNode;
  right?: ReactNode;
  children?: ReactNode;
  className?: string;
}) => {
  return (
    <div className={`border-dark-1 border-b p-2 gap-2 flex flex-col ${className}`}>
      <div className="flex items-center justify-center relative h-5">
        <div className="absolute left-0 flex">{left}</div>
        {title && <h1 className="text-blue-1 flex items-center">{title}</h1>}
        <div className="absolute right-0 flex">{right}</div>
      </div>
      {children}
    </div>
  );
};

export const FilterArea = ({
  value,
  onChange,
  title,
  icon,
}: {
  value: React.ComponentProps<"input">["value"];
  onChange: React.ComponentProps<"input">["onChange"];
  title: string;
  icon?: ReactNode;
}) => {
  const [action, setAction] = useState<"MENU" | "SEARCH">();

  const clickIcon = (actionClicked: "MENU" | "SEARCH") => {
    setAction((x) => (x === actionClicked ? undefined : actionClicked));
  };

  return (
    <TopBar
      left={
        <TopBarIconButton onClick={() => clickIcon(`MENU`)} Icon={HiOutlineMenuAlt1} />
      }
      right={
        <>
          {icon}
          <TopBarIconButton onClick={() => clickIcon(`SEARCH`)} Icon={HiSearch} />
        </>
      }
      title={title}
    >
      {action && (
        <div>
          {action === `MENU` && <MenuBar />}
          {action === `SEARCH` && (
            <input
              className="border border-black grow bg-dark-2 border-blue-1 rounded-lg text-blue-1 pl-2 text-base w-full"
              type="text"
              value={value}
              onChange={onChange}
            />
          )}
        </div>
      )}
    </TopBar>
  );
};

export const Item = ({ children, to }: { children: ReactNode; to: string }) => {
  return (
    <div className="border-dark-1">
      <NavLink to={to}>
        {({ isActive }) => (
          <div
            className={`p-4 flex ${
              isActive ? `border-l-4 border-purple-1 bg-dark-1` : `ml-[4px]`
            }`}
          >
            {children}
          </div>
        )}
      </NavLink>
    </div>
  );
};

export const ScrollItems = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return <div className={`divide-y overflow-y-scroll ${className}`}>{children}</div>;
};

export const LayoutLeft = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`flex shrink-0 bg-dark-2 border-r border-dark-1 h-screen flex-col relative ${className}`}
    >
      {children}
    </div>
  );
};
