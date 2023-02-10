import ReactDOM from "react-dom";

const OVERLAY_STYLES = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, .25)",
  zIndex: 10,
};

const ModalAdmin = ({ open, onClose, children }) => {
  if (!open) return null;
  return ReactDOM.createPortal(
    <>
      {/* overlay */}
      <div style={OVERLAY_STYLES} onClick={onClose} />
      {/* modal */}
      <div
        style={{ minWidth: 500, maxHeight: "75%" }}
        className="fixed h-auto overflow-auto top-1/3 left-1/3 ml-20 -mt-48 p-8 z-10 bg-white rounded shadow-sm"
      >
        {children}
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default ModalAdmin;
