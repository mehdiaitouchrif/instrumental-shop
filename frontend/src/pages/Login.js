import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { useAuthContext } from "../hooks/useAuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Meta from "../components/Meta";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, loading, error, token } = useAuthContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (error && !loading) {
      toast.error(error);
    }
    if (token) {
      navigate("/account/dashboard");
    }
  }, [error, loading, navigate, token]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      return toast.error("Enter your credentials!");
    }

    login(email, password);
  };

  return (
    <Layout>
      <Meta title={`Login | Instrumental Shop`} />
      <form
        className="mx-auto p-4 md:p-8 mt-10 mb-28 md:mb-44 rounded shadow border border-gray-200"
        onSubmit={onSubmit}
        style={{ maxWidth: 600 }}
      >
        <ToastContainer />
        <h3 className="text-3xl my-4 text-gray-700">Login</h3>
        <div className="my-4">
          <div className="mb-1">
            <label htmlFor="email">Email</label>
          </div>
          <input
            type="email"
            value={email}
            placeholder="Your Email"
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
            placeholder="Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full py-2 px-4 rounded border border-gray-300 shadow-sm focus:border-gray-600 outline-none"
          />
        </div>
        <input
          type="submit"
          value="Login"
          className="inline-block py-2 p-4 rounded bg-orange-500 text-white shadow hover:bg-orange-600 cursor-pointer"
        />

        {loading && <h1>Loading....</h1>}

        <hr className="my-4" />
        <div>
          <p>
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-orange-500 cursor-pointer hover:text-orange-600"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </form>
    </Layout>
  );
};

export default Login;
