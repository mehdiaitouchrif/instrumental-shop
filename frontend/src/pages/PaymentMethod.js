import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCreditCard, FaPaypal } from "react-icons/fa";
import CheckoutSteps from "../components/CheckoutSteps";
import Layout from "../components/Layout";
import { useCartContext } from "../hooks/useCartContext";
import Meta from "../components/Meta";

const PaymentMethod = () => {
  const { shippingAddress, paymentMethod, savePaymentMethod } =
    useCartContext();

  const [method, setMethod] = useState(paymentMethod || "Stripe");

  const navigate = useNavigate();

  if (!shippingAddress) navigate("/shipping");

  const onSubmit = (e) => {
    e.preventDefault();
    savePaymentMethod(method);
    navigate("/placeorder");
  };

  return (
    <Layout>
      <Meta title="Choose payment method | Instrumental Shop" />
      <CheckoutSteps step1 step2 />
      <form
        onSubmit={onSubmit}
        className="max-w-3xl mx-auto my-8 p-6 bg-white shadow-lg rounded-lg mb-40"
      >
        <h1 className="text-2xl font-semibold text-gray-700 text-center mb-6">
          Choose Payment Method
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Stripe Payment Card */}
          <div
            onClick={() => setMethod("Stripe")}
            className={`border-2 rounded-lg p-6 cursor-pointer transform transition-all ${
              method === "Stripe"
                ? "border-blue-600 scale-102"
                : "border-gray-300"
            } hover:scale-105 transition duration-300 ease-in-out`}
          >
            <div className="flex items-center">
              <input
                type="radio"
                value="Stripe"
                checked={method === "Stripe"}
                name="paymentMethod"
                id="stripe"
                className="mr-4 hidden"
              />
              {/* Using FaCcStripe from react-icons */}
              <FaCreditCard className="h-10 w-10 text-yellow-600" />
              <label
                htmlFor="stripe"
                className="ml-4 text-lg font-medium text-gray-700 cursor-pointer"
              >
                Credit/Debit Card
              </label>
            </div>
            <p className="text-gray-500 text-sm mt-2">
              Pay securely with your credit or debit card via Stripe.
            </p>
          </div>

          <div
            onClick={() => setMethod("PayPal")}
            className={`border-2 rounded-lg p-6 cursor-pointer transform transition-all ${
              method === "PayPal"
                ? "border-yellow-500 scale-102"
                : "border-gray-300"
            } hover:scale-105 transition duration-300 ease-in-out`}
          >
            <div className="flex items-center">
              <input
                type="radio"
                value="PayPal"
                checked={method === "PayPal"}
                name="paymentMethod"
                id="paypal"
                className="mr-4 hidden"
              />
              <FaPaypal className="h-10 w-10 text-blue-600" />
              <label
                htmlFor="paypal"
                className="ml-4 text-lg font-medium text-gray-700 cursor-pointer"
              >
                PayPal
              </label>
            </div>
            <p className="text-gray-500 text-sm mt-2">
              Pay easily using your PayPal account.
            </p>
          </div>
        </div>

        <div className="text-center mt-8">
          <button
            type="submit"
            className="inline-block py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out"
          >
            Continue to Payment
          </button>
        </div>
      </form>
    </Layout>
  );
};

export default PaymentMethod;
