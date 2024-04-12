import Layout from "../components/Layout";
import Meta from "../components/Meta";
import { Link } from "react-router-dom";
import OrdersTable from "../components/OrdersTable";

const AdminOrdersPage = () => {
  return (
    <Layout>
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
              Track and view order details or easily reorder products.
            </p>
          </div>

          <div className="col-span-2 py-4 px-2 md:px-8">
            <div className="flex gap-x-8 justify-center">
              <Link to="/admin/products">
                <button className="text-gray-600">Products</button>
              </Link>
              <Link to="/admin/orders">
                <button className="text-gray-600 underline">Orders</button>
              </Link>
            </div>

            {/* orders management */}
            <div className="md:p-8 my-8 col-span-2 overflow-x-scroll">
              <OrdersTable />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrdersPage;
