import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Meta from "../components/Meta";
import { Link } from "react-router-dom";
import { useProductContext } from "../hooks/useProductContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useOrdersContext from "../hooks/useOrdersContext";

const AdminDashboard = () => {
  // switch between orders and products
  const [switchToProducts, setSwitchToProducts] = useState(false);

  return (
    <Layout>
      <Meta title="Admin Dashboard | Instrumental Shop" />
      <div className="max-w-6xl mx-auto md:my-8">
        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-8">
          <div className="py-4 px-8 md:border-r text-center md:text-left border-r-gray-200">
            <h1
              className="text-4xl font-medium my-4"
              style={{ color: "#153a5b" }}
            >
              {switchToProducts ? "Products" : "Orders"} management
            </h1>
            <p className="text-gray-500 my-2">
              {!switchToProducts &&
                "Track and view order details or easily reorder products."}
              {switchToProducts &&
                "Manage products, create, update and delete."}
            </p>
          </div>

          <div className="col-span-2 py-4 px-8">
            <div className="flex gap-x-8 justify-center">
              <button
                onClick={() => setSwitchToProducts(false)}
                className={`text-gray-600 ${!switchToProducts && "underline"}`}
              >
                Orders
              </button>
              <button
                onClick={() => setSwitchToProducts(true)}
                className={`text-gray-600 ${switchToProducts && "underline"}`}
              >
                Products
              </button>
            </div>

            {/* orders management */}
            {!switchToProducts && <OrdersManagement />}

            {/* products management */}
            {switchToProducts && <ProductsManagement />}
          </div>
        </div>
      </div>
    </Layout>
  );
};

const OrdersManagement = () => {
  const { getOrders, orders, loading, error } = useOrdersContext();

  useEffect(() => {
    getOrders();

    // eslint-disable-next-line
  }, []);

  return (
    <div className="md:p-8 my-8 col-span-2">
      {loading && <h1>Loading...</h1>}
      {error && <h1>{error}</h1>}
      {orders &&
        orders.map((order) => (
          <Link
            className="inline-block w-full my-2 border-b border-gray-100"
            to={`/orders/${order._id}`}
            key={order._id}
          >
            <strong>
              Ordered at {new Date(order.createdAt).toLocaleString()}{" "}
            </strong>
            {order.orderItems.map((item, idx) => (
              <div className="flex justify-between items-center">
                <p key={idx}>{item.name}</p>
                <p>
                  {item.qty} x ${item.price}
                </p>
              </div>
            ))}
          </Link>
        ))}

      {/* No orders */}
      {orders && orders.length === 0 && (
        <div className="h-32 my-12 flex items-center justify-center rounded shadow-sm md:border border-gray-100">
          <div className="p-4">No orders yet!</div>
        </div>
      )}
    </div>
  );
};

const ProductsManagement = () => {
  const {} = useProductContext();

  useEffect(() => {}, []);

  return <div className="md:p-8 mt-8 mb-16"></div>;
};

export default AdminDashboard;
