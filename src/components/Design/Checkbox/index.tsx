interface CheckboxProps {
  className?: string;
  id: string;
  name: string;
  checked: boolean;
  onChange: React.ComponentProps<"input">["onChange"];
}

export const Checkbox = ({ className, id, name, checked, onChange }: CheckboxProps) => {
  return (
    <div className={className}>
      <input
        className="cursor-pointer"
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
