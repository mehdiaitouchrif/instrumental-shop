// NOTE: This component is no longer used.
// We have transitioned to using separate routes for the User Account and Orders pages
// instead of managing them with this component's state-based switching.

import { useState } from "react";
import Layout from "../components/Layout";
import Meta from "../components/Meta";
import UserOrders from "../components/UserOrders";
import UserAccount from "../components/UserAccount";

const UserDashboard = () => {
  // switch between orders and settings
  const [switchToAcc, setSwitchToAcc] = useState(false);

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
              {switchToAcc ? "Account" : "Orders"} management
            </h1>
            <p className="text-gray-500 my-2">
              {!switchToAcc &&
                "Track and view order details or easily reorder products."}
              {switchToAcc && "Manage your contact information and password."}
            </p>
          </div>

          <div className="col-span-2 py-4 px-8">
            <div className="flex gap-x-8 justify-center">
              <button
                onClick={() => setSwitchToAcc(false)}
                className={`text-gray-600 ${!switchToAcc && "underline"}`}
              >
                Orders
              </button>
              <button
                onClick={() => setSwitchToAcc(true)}
                className={`text-gray-600 ${switchToAcc && "underline"}`}
              >
                Account
              </button>
            </div>

            {/* User orders */}
            {!switchToAcc && <UserOrders />}

            {/* Account settings */}
            {switchToAcc && <UserAccount />}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserDashboard;
