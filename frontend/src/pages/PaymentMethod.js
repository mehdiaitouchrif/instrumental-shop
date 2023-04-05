import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import Layout from "../components/Layout";
import { useCartContext } from "../hooks/useCartContext";

const PaymentMethod = () => {
  const { shippingAddress, paymentMethod, savePaymentMethod } =
    useCartContext();

  const [method, setMethod] = useState(paymentMethod);

  const navigate = useNavigate();

  if (!shippingAddress) navigate("/shipping");

  const onSubmit = (e) => {
    e.preventDefault();

    console.log(method);
    savePaymentMethod(method);

    // Go to payment!
    navigate("/placeorder");
  };

  return (
    <Layout>
      <form onSubmit={onSubmit} className="max-w-2xl mx-auto my-8">
        <CheckoutSteps step1 step2 step3 />
        <h1 className="text-2xl text-gray-600 uppercase my-4">
          Payment Method
        </h1>
        <div className="flex items-center gap-4 mb-2">
          <input
            type="radio"
            disabled
            value="PayPal"
            defaultChecked={method === "PayPal"}
            name="paymentMethod"
            id="paypal"
            onChange={(e) => setMethod(e.target.value)}
          />
          <label htmlFor="paypal">PayPal or Credit Card</label>
        </div>
        <div className="flex items-center gap-4">
          <input
            type="radio"
            value="Stripe"
            defaultChecked={method === "Stripe"}
            name="paymentMethod"
            id="stripe"
            onChange={(e) => setMethod(e.target.value)}
          />
          <label htmlFor="stripe">Stripe</label>
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

export default PaymentMethod;
