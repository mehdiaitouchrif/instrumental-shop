import { Link, useLocation } from "react-router-dom";
import Layout from "../components/Layout";
import Meta from "../components/Meta";
import UserOrders from "../components/UserOrders";

const UserOrdersPage = () => {
  const { pathname } = useLocation();

  const renderActiveClass = pathname === "/orders" ? "font-semibold" : null;

  return (
    <Layout>
      <Meta title="My Dashboard | Instrumental Shop" />
      <div className="max-w-7xl mx-auto md:my-8">
        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-8">
          <div className="py-4 px-8 md:border-r text-center md:text-left border-r-gray-200">
            <h1
              className="text-4xl font-medium my-4"
              style={{ color: "#153a5b" }}
            >
              Manage my orders
            </h1>
            <p className="text-gray-500 my-2">
              Track and view order details or easily reorder products.
            </p>
          </div>

          <div className="col-span-2 py-4 px-8">
            <div className="flex gap-x-8 justify-center">
              <Link
                to="/orders"
                className={`text-gray-600 ${renderActiveClass}`}
              >
                Orders
              </Link>
              <Link to="/account" className={`text-gray-600`}>
                Account
              </Link>
            </div>

            {/* User orders */}
            <UserOrders />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserOrdersPage;
