interface FormFieldProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.SyntheticEvent) => void;
}

export default function FormField({
  label,
  placeholder,
  value,
  onChange,
}: FormFieldProps) {
  return (
    <div>
      <label htmlFor={label} className="block text-gray-700">
        {label}
      </label>
      <input
        value={value}
        onChange={onChange}
        type="text"
        id={label}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
        autoFocus
        required
      />
    </div>
  );
}
