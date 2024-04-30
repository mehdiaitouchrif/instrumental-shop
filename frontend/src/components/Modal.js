import { useEffect } from "react";
import ReactDOM from "react-dom";

const OVERLAY_STYLES = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, .5)",
  zIndex: 10,
};

const Modal = ({ open, onClose, children }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (open) {
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("keydown", handleKeyDown);
    }
  }, [open, onClose]);

  if (!open) return null;
  return ReactDOM.createPortal(
    <>
      {/* overlay */}
      <div
        style={OVERLAY_STYLES}
        onClick={onClose}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            onClose();
          }
        }}
        tabIndex="0"
      />
      {/* modal */}
      <div className="fixed top-20 right-6 md:right-36 p-8 z-10 bg-white rounded shadow-sm w-[350px]">
        {children}
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default Modal;
