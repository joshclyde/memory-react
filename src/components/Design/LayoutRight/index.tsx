import React from "react";

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
