interface ButtonProps {
  title: string;
  loading?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

const  Button = ({title, loading, disabled, type, onClick, className = ''}: ButtonProps) => {
  return (
    <button
      type={type}
      className={`px-4 py-2 font-bold text-white rounded-lg focus:outline-none focus:ring-2 ${className} ${
        disabled || loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
      }`}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading ? "Loading..." : title}
    </button>
  )
}

export default  Button