import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import AdminDashboard from "./pages/AdminDashboard";
import Collection from "./pages/Collection";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Product from "./pages/Product";
import Signup from "./pages/Signup";
import UserDashboard from "./pages/UserDashboard";

const App = () => {
  const { user } = useAuthContext();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!user ? <Signup /> : <Navigate to="/" />}
        />
        <Route path="/:collection" element={<Collection />} />
        <Route path="/:collection/:productSlug" element={<Product />} />
        <Route
          path="/account/dashboard"
          element={
            !user ? (
              <Login />
            ) : user.role === "admin" ? (
              <AdminDashboard />
            ) : (
              <UserDashboard />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
