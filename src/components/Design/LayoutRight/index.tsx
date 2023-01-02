import React from "react";
import { IconType } from "react-icons";

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
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={`p-4 md:px-9 flex-grow ${className}`}>{children}</div>;
};

export const WholeView = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return <div className={`bg-dark-2 h-screen w-full ${className}`}>{children}</div>;
};
