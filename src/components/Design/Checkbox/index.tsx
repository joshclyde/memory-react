interface CheckboxProps {
  className?: string;
  id: string;
  name: string;
  checked: boolean;
  onChange: React.ComponentProps<"input">["onChange"];
}

export const Checkbox = ({ className, id, name, checked, onChange }: CheckboxProps) => {
  return (
    <div className={`flex items-center ${className}`}>
      <input
        className={`cursor-pointer appearance-none w-4 h-4 rounded-sm ${
          checked ? `bg-green-1` : `bg-dark-1`
        }`}
        type="checkbox"
        id={id}
        name={name}
        checked={checked}
        onChange={onChange}
      />
      <label className="pl-2 cursor-pointer" htmlFor={id}>
        {name}
      </label>
    </div>
  );
};
