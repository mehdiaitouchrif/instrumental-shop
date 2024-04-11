import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const PrivateRoutes = () => {
  const { user } = useAuthContext();

  return user && user.role === "user" ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoutes;
