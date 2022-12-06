import React from "react";

export const ActionsView = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex flex-col">{children}</div>;
};

export const BodyView = ({ children }: { children: React.ReactNode }) => {
  return <div className="pr-9 flex-grow">{children}</div>;
};

export const WholeView = ({ children }: { children: React.ReactNode }) => {
  return <div className="p-9 flex ">{children}</div>;
};
