import { ReactNode } from "react";
import { NavLink } from "react-router-dom";

export const Link = ({
  to,
  className,
  children,
}: {
  to: string;
  className?: string;
  children: ReactNode;
}) => {
  return (
    <NavLink className={`text-blue-1 underline ${className}`} to={to}>
      {children}
    </NavLink>
  );
};
