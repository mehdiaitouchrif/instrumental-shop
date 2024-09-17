import { FaInfoCircle, FaExclamationTriangle, FaCheck } from "react-icons/fa";

const Message = ({ children, variant = "warning" }) => {
  const iconClasses = "text-xl mr-2";
  const messageStyles = `p-4 rounded-lg shadow-md my-4 flex items-center gap-3 transition-all duration-300 ease-in-out transform ${
    variant === "danger" && "bg-red-50 border-l-4 border-red-500 text-red-700"
  } ${
    variant === "warning" &&
    "bg-yellow-50 border-l-4 border-yellow-500 text-yellow-700"
  } ${
    variant === "success" &&
    "bg-green-50 border-l-4 border-green-500 text-green-700"
  }`;

  return (
    <div className={messageStyles}>
      {variant === "danger" && (
        <FaExclamationTriangle className={iconClasses} />
      )}
      {variant === "warning" && <FaInfoCircle className={iconClasses} />}
      {variant === "success" && <FaCheck className={iconClasses} />}
      <span className="text-sm font-medium">{children}</span>
    </div>
  );
};

export default Message;
