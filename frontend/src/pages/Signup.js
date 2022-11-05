import { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    console.log(firstName, lastName, email, password);
  };
  return (
    <form
      className="mx-auto p-8 rounded shadow border border-gray-200"
      style={{ width: 600 }}
      onSubmit={onSubmit}
    >
      <h3 className="text-3xl my-4 text-gray-700">Sign Up</h3>
      <div className="flex items-center justify-between gap-4 mt-6">
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
        value="Login"
        className="inline-block py-2 p-4 rounded bg-orange-500 text-white shadow hover:bg-orange-600 cursor-pointer"
      />

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
  );
};

export default Signup;
