import { ReactNode } from "react";
import { HiPlus } from "react-icons/hi";
import { Link, NavLink } from "react-router-dom";

export const FilterArea = ({
  children,
  toNew,
  value,
  onChange,
}: {
  children?: ReactNode;
  toNew: string;
  value: React.ComponentProps<"input">["value"];
  onChange: React.ComponentProps<"input">["onChange"];
}) => {
  return (
    <div className="flex p-2 items-center border-dark-1 border-b">
      <input
        className="border border-black grow bg-dark-2 border-blue-1 rounded-lg text-blue-1 pl-2 text-base"
        type="text"
        value={value}
        onChange={onChange}
      />
      <Link to={toNew} className="ml-2 text-blue-1 border border-blue-1 rounded">
        <HiPlus />
      </Link>
      {children}
    </div>
  );
};

export const Item = ({ children, to }: { children: ReactNode; to: string }) => {
  return (
    <div className="border-dark-1">
      <NavLink to={to}>
        {({ isActive }) => (
          <div
            className={`p-4 flex ${isActive ? `border-l-4 border-purple-1` : `ml-[4px]`}`}
          >
            {children}
          </div>
        )}
      </NavLink>
    </div>
  );
};

export const ScrollItems = ({ children }: { children: ReactNode }) => {
  return <div className="divide-y overflow-y-scroll">{children}</div>;
};

export const LayoutLeft = ({ children }: { children: ReactNode }) => {
  return (
    <div className="basis-96 shrink-0 bg-dark-2 border-r border-dark-1 h-screen flex flex-col">
      {children}
    </div>
  );
};
