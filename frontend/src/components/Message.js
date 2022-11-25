import { FaInfoCircle, FaExclamationTriangle, FaCheck } from "react-icons/fa";

const Message = ({ children, variant = "warning" }) => {
  return (
    <div
      className={`p-4 rounded shadow my-4 flex items-center gap-2  ${
        variant === "danger" && "bg-red-100"
      } ${variant === "warning" && "bg-yellow-100"} ${
        variant === "success" && "bg-green-100"
      } `}
    >
      {variant === "danger" && <FaExclamationTriangle size={20} />}
      {variant === "warning" && <FaInfoCircle size={20} />}
      {variant === "success" && <FaCheck size={20} />}
      {children}
    </div>
  );
};

export default Message;
