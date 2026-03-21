import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const VARIANTS = {
  primary:   "bg-yellow-400 text-black hover:bg-yellow-300",
  danger:    "bg-red-600 hover:bg-red-500 text-white",
  ghost:     "text-white hover:text-yellow-400",
  secondary: "bg-gray-800 text-white hover:bg-gray-700 disabled:opacity-30",
};

export function Button({ variant = "primary", className = "", children, ...props }) {
  return (
    <button className={`${VARIANTS[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}

export function Spinner({ message = "불러오는 중...", full = false, className = "" }) {
  if (full) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <p className="text-white text-2xl animate-pulse">{message}</p>
      </div>
    );
  }
  return <p className={`text-white text-xl ${className}`}>{message}</p>;
}

export function Modal({ onClose, children }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
      <div className="relative">
        <Button variant="ghost" onClick={onClose} className="absolute -top-10 right-0 text-2xl">
          <FontAwesomeIcon icon={faXmark} />
        </Button>
        {children}
      </div>
    </div>
  );
}

export function Container({ className = "", children }) {
  return (
    <section className={`bg-black px-11 ${className}`}>
      <div className="container mx-auto">
        {children}
      </div>
    </section>
  );
}
