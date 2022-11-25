import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import Layout from "../components/Layout";
import Message from "../components/Message";
import { useCartContext } from "../hooks/useCartContext";
import useOrdersContext from "../hooks/useOrdersContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PlaceOrder = () => {
  const { cartItems, total, shippingAddress, paymentMethod } = useCartContext();

  const { createOrder, order, loading, error, success } = useOrdersContext();

  const placeOrderHandler = () => {
    createOrder({
      orderItems: cartItems,
      shippingAddress,
      paymentMethod,
      totalPrice: total,
    });

    if (error) {
      toast.error(error);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (success) {
      navigate(`/orders/${order._id}`);
    }

    // eslint-disable-next-line
  }, [success, navigate]);

  return (
    <Layout>
      <ToastContainer />
      <div className="max-w-6xl mx-auto my-8 md:mb-60">
        <CheckoutSteps step1 step2 step3 step4 />
        <div className="grid grid-cols-12 md:gap-16 text-gray-700">
          <div className="col-span-12 md:col-span-8">
            <ul>
              <li className="py-4 border-b border-gray-100">
                <h2 className="text-2xl uppercase my-2 text-gray-700">
                  Shipping
                </h2>
                <p>
                  <strong>Address: </strong>
                  {shippingAddress.address}, {shippingAddress.city},{" "}
                  {shippingAddress.postalCode}, {shippingAddress.country}
                </p>
              </li>
              <li className="py-4 border-b border-gray-100">
                <h2 className="text-2xl uppercase my-2 text-gray-700">
                  Payment method
                </h2>
                <p>
                  <strong>Method: </strong>
                  {paymentMethod}
                </p>
              </li>
              <li className="py-4 border-b border-gray-100">
                <h2 className="text-2xl uppercase my-4 text-gray-700">
                  Orders items
                </h2>
                {cartItems.length === 0 ? (
                  <Message>Your cart is empty!</Message>
                ) : (
                  cartItems.map((item, idx) => (
                    <li key={idx}>
                      <div className="grid grid-cols-12 gap-4 my-2 items-center">
                        <div
                          style={{ width: 50, height: 50 }}
                          className="col-span-2 md:col-span-1 bg-gray-50 border rounded shadow-sm flex items-center justify-center"
                        >
                          <img
                            className="object-contain w-full h-4/5 mix-blend-multiply"
                            src={item.image}
                            alt=""
                          />
                        </div>
                        <div className="col-span-6 text-xs md:text-base md:col-span-8">
                          <Link
                            className="hover:underline text-sm md:text-base hover:text-gray-900 inline-block"
                            to={`/${item.slug}`}
                          >
                            {item.name}
                          </Link>
                        </div>
                        <div className="col-span-4 text-xs md:text-base md:col-span-3">
                          {item.qty} x ${item.price} = $
                          {Number(item.qty * item.price).toFixed(2)}{" "}
                        </div>
                      </div>
                    </li>
                  ))
                )}
              </li>
            </ul>
          </div>

          <div className="col-span-12 md:col-span-4">
            <ul>
              <li className="py-4 border-b border-gray-100">
                <h2 className="text-2xl uppercase my-4 text-gray-700">
                  Order summary
                </h2>
              </li>
              <li className="grid grid-cols-2 py-4 border-b border-gray-100">
                <div>Total</div>
                <div>${total}</div>
              </li>
              <li className="border-b border-gray-100">
                <button
                  onClick={placeOrderHandler}
                  disabled={total === 0}
                  className="inline-block py-2 px-4 w-full my-4 bg-black hover:bg-gray-800 text-white rounded-sm shadow-sm"
                >
                  Place order
                </button>
                {loading && <h1>Loading...</h1>}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PlaceOrder;
