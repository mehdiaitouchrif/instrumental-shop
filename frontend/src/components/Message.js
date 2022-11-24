import { FaInfoCircle } from "react-icons/fa";

const Message = ({ text }) => {
  return (
    <div className="p-4 rounded shadow my-4 flex items-center gap-2">
      <FaInfoCircle size={20} />
      {text}
    </div>
  );
};

export default Message;
