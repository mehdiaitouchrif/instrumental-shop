import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import Layout from "../components/Layout";
import { useCartContext } from "../hooks/useCartContext";
import Meta from "../components/Meta";

const Shipping = () => {
  const { shippingAddress, saveShippingAddress } = useCartContext();

  const [address, setAddress] = useState(shippingAddress?.address || "");
  const [city, setCity] = useState(shippingAddress?.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress?.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress?.country || "");

  const navigate = useNavigate();
  const onSubmit = (e) => {
    e.preventDefault();
    saveShippingAddress({ address, city, postalCode, country });
    navigate("/payment");
  };

  return (
    <Layout>
      <Meta title="Shipping address | Instrumental Shop" />
      <CheckoutSteps step1 />
      <form
        onSubmit={onSubmit}
        className="max-w-2xl mx-auto my-6 p-6 bg-white shadow-md rounded-md mb-40"
      >
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Shipping</h1>

        <div className="space-y-5">
          <div className="flex flex-col">
            <label htmlFor="address" className="text-gray-600 font-medium">
              Address
            </label>
            <input
              type="text"
              value={address}
              required
              id="address"
              placeholder="Enter address"
              className="py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="city" className="text-gray-600 font-medium">
              City
            </label>
            <input
              type="text"
              value={city}
              required
              id="city"
              placeholder="Enter city"
              className="py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={(e) => setCity(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="postalCode" className="text-gray-600 font-medium">
              Postal Code
            </label>
            <input
              type="text"
              value={postalCode}
              required
              id="postalCode"
              placeholder="Enter postal code"
              className="py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="country" className="text-gray-600 font-medium">
              Country
            </label>
            <input
              type="text"
              value={country}
              required
              id="country"
              placeholder="Enter country"
              className="py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors focus:ring-2 focus:ring-blue-400"
        >
          Continue
        </button>
      </form>
    </Layout>
  );
};

export default Shipping;
