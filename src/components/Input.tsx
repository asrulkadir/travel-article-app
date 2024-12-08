interface InputProps {
  type?: string;
  id?: string;
  value?: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
  required?: boolean;
  clearable?: boolean;
  onClear?: () => void;
}

const Input = ({ onChange, onClear, className = '',clearable = false, ...props }: InputProps) => {
  return (
    <div className="relative">
      <input
        onChange={(e) => onChange(e.target.value)}
        className={`w-full px-4 py-2 text-gray-900 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
        {...props}
      />
      {clearable && (
        <button
          type="button"
          onClick={onClear}
          className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
      )}
    </div>
  )
}

export default Input