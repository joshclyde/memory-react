import React from "react";
import { IconType } from "react-icons";
import { HiOutlineChevronLeft } from "react-icons/hi";
import { Link } from "react-router-dom";

export const ActionsIconButton = ({
  Icon,
  ...props
}: React.ComponentProps<"button"> & { Icon: IconType }) => {
  return (
    <button type="button" {...props}>
      <Icon size="2em" />
    </button>
  );
};

export const ActionsView = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex flex-col gap-4">{children}</div>;
};

export const BodyView = ({
  children,
  className,
  toBackLink,
}: {
  // TODO: make children and className reusable stuff
  children: React.ReactNode;
  className?: string;
  toBackLink: string;
}) => {
  // TODO: create className function instead of manually inserting each time
  return (
    <div className={`pr-9 flex-grow ${className}`}>
      <Link to={toBackLink} className="md:hidden">
        <HiOutlineChevronLeft size="2em" className="mb-4" />
      </Link>
      {children}
    </div>
  );
};

export const WholeView = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={`p-4 md:p-9 flex bg-dark-2 h-screen w-full ${className}`}>
      {children}
    </div>
  );
};
