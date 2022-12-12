export const Button = ({ className, ...props }: React.ComponentProps<"button">) => {
  return (
    <button
      type="button"
      {...props}
      className={`bg-dark-1 p-2 rounded-md ${className}`}
    />
  );
};
