import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import Layout from "../components/Layout";
import Message from "../components/Message";
import { useCartContext } from "../hooks/useCartContext";
import useOrdersContext from "../hooks/useOrdersContext";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import Meta from "../components/Meta";

const PlaceOrder = () => {
  // Cart context
  const {
    cartItems,
    total,
    subtotal,
    shippingPrice,
    taxPrice,
    shippingAddress,
    paymentMethod,
  } = useCartContext();

  // Order context
  const {
    createOrder,
    order,
    loading,
    error,
    isOrderCreated,
    resetOrderState,
  } = useOrdersContext();

  const navigate = useNavigate();

  // Create order
  const placeOrderHandler = () => {
    createOrder({
      orderItems: cartItems,
      shippingAddress,
      paymentMethod,
      shippingPrice,
      taxPrice,
      totalPrice: total,
    });
  };

  useEffect(() => {
    resetOrderState();

    if (error) {
      toast.error(error);
    }

    if (isOrderCreated) {
      return navigate(`/orders/${order._id}`);
    }
    // eslint-disable-next-line
  }, [cartItems, navigate, error, isOrderCreated]);

  return (
    <Layout>
      <Meta title="Place order | Instrumental Shop" />
      <CheckoutSteps step1 step2 step3 />
      <div className="max-w-5xl mx-auto my-4 px-4 md:px-0 mb-40">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 text-gray-700">
          {/* Left Section */}
          <div className="col-span-12 md:col-span-8">
            <ul className="space-y-6">
              <li className="border rounded-lg shadow-sm p-6 bg-white">
                <h2 className="text-2xl font-semibold mb-4">
                  Shipping Address
                </h2>
                <p className="text-sm">
                  <strong>Address: </strong>
                  {shippingAddress.address}, {shippingAddress.city},{" "}
                  {shippingAddress.postalCode}, {shippingAddress.country}
                </p>
              </li>
              <li className="border rounded-lg shadow-sm p-6 bg-white">
                <h2 className="text-2xl font-semibold mb-4">Payment Method</h2>
                <p className="text-sm">
                  <strong>Method: </strong>
                  {paymentMethod}
                </p>
              </li>
              <li className="border rounded-lg shadow-sm p-6 bg-white">
                <h2 className="text-2xl font-semibold mb-4">Order Items</h2>
                {cartItems.length === 0 ? (
                  <Message>Your cart is empty!</Message>
                ) : (
                  <ul className="space-y-4">
                    {cartItems.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-14 h-14 bg-gray-50 border rounded-lg flex items-center justify-center shadow-sm">
                            <img
                              className="object-contain w-full h-full"
                              src={item.image}
                              alt={item.name}
                            />
                          </div>
                          <div>
                            <Link
                              to={`/${item.slug}`}
                              className="text-sm font-semibold text-gray-900 hover:text-blue-600 hover:underline"
                            >
                              {item.name}
                            </Link>
                          </div>
                        </div>
                        <div className="text-sm font-medium">
                          {item.qty} x ${item.price} = $
                          {Number(item.qty * item.price).toFixed(2)}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            </ul>
          </div>

          {/* Right Section */}
          <div className="col-span-12 md:col-span-4">
            <div className="border rounded-lg shadow-md bg-white p-6 space-y-4">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                Order Summary
              </h2>

              {/* Subtotal */}
              <div className="flex justify-between items-center">
                <span className="text-sm font-sm">Subtotal</span>
                <span className="font-light">${subtotal}</span>
              </div>

              {/* Shipping */}
              <div className="flex justify-between items-center">
                <span className="text-sm font-sm">Shipping</span>
                <span className="font-light">
                  {shippingPrice === 0 ? "Free" : `$${shippingPrice}`}
                </span>
              </div>

              {/* Tax */}
              <div className="flex justify-between items-center">
                <span className="text-sm font-sm">Tax (20%)</span>
                <span className="font-sm font-light">${taxPrice}</span>
              </div>

              {/* Total */}
              <div className="flex justify-between items-center border-t pt-4">
                <span className="text-sm font-medium">Total</span>
                <span className="text-lg font-semibold">${total}</span>
              </div>

              {/* Place Order Button */}
              <button
                onClick={placeOrderHandler}
                disabled={total === 0}
                className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? <Spinner /> : "Place Order"}
              </button>
              {error && <Message variant="danger">{error}</Message>}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PlaceOrder;
