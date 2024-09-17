import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import Meta from "../components/Meta";
import UserAccount from "../components/UserAccount";

const UserAccountPage = () => {
  return (
    <Layout>
      <Meta title="My Account | Instrumental Shop" />
      <div className="max-w-7xl mx-auto md:my-8">
        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-8">
          <div className="py-4 px-8 md:border-r text-center md:text-left border-r-gray-200">
            <h1
              className="text-4xl font-medium my-4"
              style={{ color: "#153a5b" }}
            >
              Manage my account
            </h1>
            <p className="text-gray-500 my-2">
              Manage your contact information and password.
            </p>
          </div>

          <div className="col-span-2 py-4 px-8">
            <div className="flex gap-x-8 justify-center">
              <Link to="/orders" className={`text-gray-600 underline`}>
                Orders
              </Link>
              <Link to="/account" className={`text-gray-600 underline`}>
                Account
              </Link>
            </div>

            {/* User orders */}
            <UserAccount />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserAccountPage;
