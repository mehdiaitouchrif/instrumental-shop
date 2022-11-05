import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
  };
  return (
    <form
      className="mx-auto p-8 rounded shadow border border-gray-200"
      style={{ width: 600 }}
      onSubmit={onSubmit}
    >
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
  );
};

export default Login;
