import React from "react";

export const ActionsView = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex flex-col">{children}</div>;
};

export const BodyView = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return <div className={`pr-9 flex-grow ${className}`}>{children}</div>;
};

export const WholeView = ({ children }: { children: React.ReactNode }) => {
  return <div className="p-9 flex bg-dark-2 h-screen w-full">{children}</div>;
};
