interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label?: string;
  error?: string;
  textarea?: boolean;
}

const Input = ({
  label,
  error,
  textarea = false,
  className,
  ...props
}: InputProps) => {
  const Component = textarea ? "textarea" : "input";

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}
      <Component
        className={`p-2 border rounded-md focus:ring-2 focus:ring-blue-400 ${
          error ? "border-red-500" : "border-gray-300"
        } ${className}`}
        {...props}
      />
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
};

export default Input;
