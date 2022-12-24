import { HiExclamationCircle } from "react-icons/hi";

export const ErrorMessage = ({ children }: { children: string }) => {
  return (
    <div className="flex flex-row items-center">
      <HiExclamationCircle className="mr-1" size="2em" />
      {children}
    </div>
  );
};
