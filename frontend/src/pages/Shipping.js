import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import Layout from "../components/Layout";
import { useCartContext } from "../hooks/useCartContext";

const Shipping = () => {
  const { shippingAddress, saveShippingAddress } = useCartContext();

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const navigate = useNavigate();
  const onSubmit = (e) => {
    e.preventDefault();

    saveShippingAddress({ address, city, postalCode, country });

    // Go to payment!
    navigate("/payment");
  };

  return (
    <Layout>
      <form onSubmit={onSubmit} className="max-w-2xl mx-auto my-8">
        <CheckoutSteps step1 step2 />
        <h1 className="text-2xl text-gray-600 uppercase my-4">Shipping</h1>
        <div className="flex flex-col my-3 gap-2">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            value={address}
            required
            id="address"
            placeholder="Enter address"
            className="py-2 px-4 rounded-sm shadow-sm border border-gray-200"
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="flex flex-col my-3 gap-2">
          <label htmlFor="city">City</label>
          <input
            type="text"
            value={city}
            required
            id="city"
            placeholder="Enter city"
            className="py-2 px-4 rounded-sm shadow-sm border border-gray-200"
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="postalCode">Postal Code</label>
          <input
            type="text"
            id="postalCode"
            value={postalCode}
            placeholder="Enter postal code"
            required
            className="py-2 px-4 rounded-sm shadow-sm border border-gray-200"
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </div>
        <div className="flex flex-col my-3 gap-2">
          <label htmlFor="country">Country</label>
          <input
            type="text"
            id="country"
            value={country}
            required
            placeholder="Select country"
            className="py-2 px-4 rounded-sm shadow-sm border border-gray-200"
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="inline-block py-2 px-4 my-4 bg-black hover:bg-gray-800 hover:shadow text-white rounded-sm shadow-sm"
        >
          Continue
        </button>
      </form>
    </Layout>
  );
};

export default Shipping;
