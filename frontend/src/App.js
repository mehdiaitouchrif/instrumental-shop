import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import AddProduct from "./pages/AddProduct";
import Collection from "./pages/Collection";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Order from "./pages/Order";
import PaymentMethod from "./pages/PaymentMethod";
import PlaceOrder from "./pages/PlaceOrder";
import Product from "./pages/Product";
import Shipping from "./pages/Shipping";
import Signup from "./pages/Signup";
import SuccessPayment from "./pages/SuccessPayment";
import UserDashboard from "./pages/UserDashboard";
import EditProduct from "./pages/EditProduct";
import AdminProductsPage from "./pages/AdminProductsPage";
import AdminOrdersPage from "./pages/AdminOrdersPage";

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
              <Navigate to="/login" />
            ) : user.role === "admin" ? (
              <Navigate to="/admin/orders" />
            ) : (
              <UserDashboard />
            )
          }
        />
        <Route
          path="/admin/orders"
          element={
            user && user.role === "admin" ? (
              <AdminOrdersPage />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/admin/products"
          element={
            user && user.role === "admin" ? (
              <AdminProductsPage />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/shipping"
          element={user ? <Shipping /> : <Navigate to="/login" />}
        />
        <Route
          path="/payment"
          element={user ? <PaymentMethod /> : <Navigate to="/login" />}
        />
        <Route
          path="placeorder"
          element={user ? <PlaceOrder /> : <Navigate to="/login" />}
        />
        <Route
          path="/orders/:id"
          element={user ? <Order /> : <Navigate to="/login" />}
        />
        <Route path="/success/:orderId" element={<SuccessPayment />} />
        <Route path="/admin/add-product" element={<AddProduct />} />
        <Route
          path="/admin/edit-product/:productSlug"
          element={<EditProduct />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
