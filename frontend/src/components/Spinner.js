const loadingSpinnerContainer = {
  position: "fixed",
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  zIndex: 5000,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const loadingSpinner = {
  width: 64,
  height: 64,
  border: "8px solid",
  borderColor: "#000 transparent #555 transparent",
  borderRadius: "50%",
  animation: "spin 1.2s linear infinite",
};
const Spinner = () => {
  return (
    <div style={loadingSpinnerContainer}>
      <div style={loadingSpinner}></div>
    </div>
  );
};

export default Spinner;
