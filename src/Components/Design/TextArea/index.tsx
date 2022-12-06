export const TextArea = ({ className, ...props }: React.ComponentProps<"textarea">) => {
  return <textarea {...props} className={`bg-dark-1 h-32 p-4 ${className}`} />;
};
