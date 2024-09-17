import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import UserAccount from "./pages/UserAccount";
import UserOrders from "./pages/UserOrders";
import EditProduct from "./pages/EditProduct";
import AdminProductsPage from "./pages/AdminProductsPage";
import AdminOrdersPage from "./pages/AdminOrdersPage";
import UserRoutes from "./components/UserRoutes";
import AdminRoutes from "./components/AdminRoutes";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/:collection" element={<Collection />} />
        <Route path="/:collection/:productSlug" element={<Product />} />

        <Route element={<UserRoutes />}>
          <Route path="/account" element={<UserAccount />} />
          <Route path="/orders" element={<UserOrders />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/payment" element={<PaymentMethod />} />
          <Route path="placeorder" element={<PlaceOrder />} />
          <Route path="/orders/:id" element={<Order />} />
          <Route path="/success/:orderId" element={<SuccessPayment />} />
        </Route>

        <Route element={<AdminRoutes />}>
          <Route path="/admin/orders" element={<AdminOrdersPage />} />
          <Route path="/admin/products" element={<AdminProductsPage />} />
          <Route path="/admin/add-product" element={<AddProduct />} />
          <Route
            path="/admin/edit-product/:productSlug"
            element={<EditProduct />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
