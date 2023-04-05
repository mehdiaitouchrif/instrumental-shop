import { useEffect } from "react";
import Layout from "../components/Layout";
import Meta from "../components/Meta";
import { Link } from "react-router-dom";
import useOrdersContext from "../hooks/useOrdersContext";
import OrdersTable from "../components/OrdersTable";
import Spinner from "../components/Spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminOrdersPage = () => {
  const { getOrders, orders, loading, error } = useOrdersContext();

  useEffect(() => {
    getOrders();

    if (error) {
      toast.error("Something Went Wrong!");
    }

    // eslint-disable-next-line
  }, []);

  return (
    <Layout>
      <ToastContainer />
      <Meta title="Admin Dashboard | Instrumental Shop" />
      <div className="max-w-7xl mx-auto md:my-8">
        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-8">
          <div className="py-4 px-8 md:border-r text-center md:text-left border-r-gray-200">
            <h1
              className="text-4xl font-medium my-4"
              style={{ color: "#153a5b" }}
            >
              Orders management
            </h1>
            <p className="text-gray-500 my-2">
              "Track and view order details or easily reorder products."
            </p>
          </div>

          <div className="col-span-2 py-4 px-8">
            <div className="flex gap-x-8 justify-center">
              <Link to="/admin/orders">
                <button className="text-gray-600 underline">Orders</button>
              </Link>
              <Link to="/admin/products">
                <button className="text-gray-600">Products</button>
              </Link>
            </div>

            {/* orders management */}
            <div className="md:p-8 my-8 col-span-2">
              {loading && <Spinner />}

              {orders && <OrdersTable data={orders} />}

              {/* No orders */}
              {orders && orders.length === 0 && (
                <div className="h-32 my-12 flex items-center justify-center rounded shadow-sm md:border border-gray-100">
                  <div className="p-4">No orders yet!</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrdersPage;
