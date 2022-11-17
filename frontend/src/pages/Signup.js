import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { useAuthContext } from "../hooks/useAuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Meta from "../components/Meta";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signup, loading, error, token } = useAuthContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (error && !loading) {
      error.map((err) => Object.keys(err).map((k) => toast.error(err[k])));
    }
    if (token) {
      navigate("/account/dashboard");
    }
  }, [error, loading, navigate, token]);

  const onSubmit = (e) => {
    e.preventDefault();

    signup({ firstName, lastName, email, password });
  };

  return (
    <Layout>
      <Meta title="Sign Up | Instrumental Shop" />
      <form
        className="mx-auto p-4 md:p-8 mt-10 mb-44 rounded shadow border border-gray-200"
        style={{ maxWidth: 600 }}
        onSubmit={onSubmit}
      >
        <ToastContainer />
        <h3 className="text-3xl my-4 text-gray-700">Sign Up</h3>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-6">
          <div>
            <div className="mb-1">
              <label htmlFor="firstName">First Name</label>
            </div>
            <input
              type="text"
              value={firstName}
              placeholder="Ex. John"
              onChange={(e) => setFirstName(e.target.value)}
              className="block w-full py-2 px-4 rounded border border-gray-300 shadow-sm focus:border-gray-600 outline-none"
            />
          </div>
          <div>
            <div className="mb-1">
              <label htmlFor="lastName">Last Name</label>
            </div>
            <input
              type="text"
              value={lastName}
              placeholder="Ex. Doe"
              onChange={(e) => setLastName(e.target.value)}
              className="block w-full py-2 px-4 rounded border border-gray-300 shadow-sm focus:border-gray-600 outline-none"
            />
          </div>
        </div>
        <div className="my-4">
          <div className="mb-1">
            <label htmlFor="email">Email</label>
          </div>
          <input
            type="email"
            value={email}
            placeholder="Ex. john@example.com"
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full py-2 px-4 rounded border border-gray-300 shadow-sm focus:border-gray-600 outline-none"
          />
        </div>
        <div className="my-4">
          <div className="mb-1">
            <label htmlFor="password">Password</label>
          </div>
          <input
            type="password"
            placeholder="Enter a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full py-2 px-4 rounded border border-gray-300 shadow-sm focus:border-gray-600 outline-none"
          />
        </div>
        <input
          type="submit"
          value="Sign Up"
          className="inline-block py-2 p-4 rounded bg-orange-500 text-white shadow hover:bg-orange-600 cursor-pointer"
        />

        {loading && <h1>Loading....</h1>}

        <hr className="my-4" />

        <div>
          <p>
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-orange-500 cursor-pointer hover:text-orange-600"
            >
              Login
            </Link>
          </p>
        </div>
      </form>
    </Layout>
  );
};

export default Signup;
