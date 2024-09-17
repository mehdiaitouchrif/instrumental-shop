import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { BiCreditCard } from "react-icons/bi";
import moment from "moment";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import useOrdersContext from "../hooks/useOrdersContext";
import { useCartContext } from "../hooks/useCartContext";
import Layout from "../components/Layout";
import Message from "../components/Message";
import Spinner from "../components/Spinner";
import Meta from "../components/Meta";

const Order = () => {
  // Order contxt
  const {
    getOrder,
    order,
    loading,
    paymentLoading,
    isPaymentSuccessful,
    error,
    createStripeSession,
    getPaypalClientID,
    paypalClientID,
    paypalClientIDLoading,
    updateToPaid,
  } = useOrdersContext();

  // Cart context
  const { total, shippingPrice, taxPrice } = useCartContext();

  const params = useParams();

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  useEffect(() => {
    const loadPaypalScript = async () => {
      paypalDispatch({
        type: "resetOptions",
        value: {
          "client-id": paypalClientID,
          currency: "USD",
        },
      });
      paypalDispatch({ type: "setLoadingStatus", value: "pending" });
    };

    getOrder(params.id);
    if (!paypalClientID) {
      getPaypalClientID();
    }

    if (error) {
      toast.error(error);
    }

    if (!paypalClientIDLoading && paypalClientID && !order?.isPaid) {
      if (!window.paypal) {
        loadPaypalScript();
      }
    }

    // eslint-disable-next-line
  }, [params.id, paypalClientID, paypalDispatch, isPaymentSuccessful]);

  // Stripe payment
  const createPaymentSession = () => {
    createStripeSession(order._id);
  };

  // Paypal payment
  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        updateToPaid(params.id);
        toast.success("Order is paid");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    });
  }
  function onError(err) {
    toast.error(err.message);
  }

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: order.totalPrice },
          },
        ],
      })
      .then((orderID) => {
        return orderID;
      });
  }
  return (
    <Layout>
      <Meta title="Order details | Instrumental Shop" />
      {/* Breadcrumbs */}
      <div className="max-w-6xl mx-auto my-4 p-4 bg-transparent">
        <nav className="bg-transparent py-3 px-4 rounded-lg text-sm">
          <Link to="/" className="text-gray-500 hover:text-gray-800">
            Home
          </Link>
          {" > "}
          <Link
            to="/account/dashboard"
            className="text-gray-500 hover:text-gray-800"
          >
            Orders
          </Link>
          {" > "}
          <Link
            to={`/orders/${params.id}`}
            className="text-gray-500 hover:text-gray-800"
          >
            #{params.id}
          </Link>
        </nav>
      </div>

      {/* Order Information */}
      <div className="max-w-6xl mx-auto px-4 mb-40">
        {loading ? (
          <Spinner />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          order && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Shipping & Payment Details */}
              <div className="bg-gray-100 p-6 rounded-lg shadow-sm">
                <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                  Shipping Details
                </h3>
                <p className="mb-2">
                  <strong className="text-gray-700">Full Name: </strong>
                  {order.user.firstName} {order.user.lastName}
                </p>
                <p className="mb-2">
                  <strong className="text-gray-700">Email: </strong>
                  <a
                    href={`mailto:${order.user.email}`}
                    className="text-blue-600 hover:underline"
                  >
                    {order.user.email}
                  </a>
                </p>
                <p className="mb-2">
                  <strong className="text-gray-700">Address: </strong>
                  {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
                  {order.shippingAddress.postalCode},{" "}
                  {order.shippingAddress.country}
                </p>
                {order.isDelivered ? (
                  <Message variant="success">
                    Delivered on{" "}
                    {moment(order.deliveredAt).format(
                      "MMMM D, YYYY [at] h:mm A"
                    )}
                  </Message>
                ) : (
                  <Message variant="danger">Not delivered</Message>
                )}
                <h3 className="text-2xl font-semibold mt-6 mb-4 text-gray-800">
                  Payment Method
                </h3>
                <p className="mb-2">
                  <strong className="text-gray-700">Method: </strong>
                  {order.paymentMethod}
                </p>
                {order.isPaid ? (
                  <Message variant="success">
                    Paid on{" "}
                    {moment(order.paidAt).format("MMMM D, YYYY [at] h:mm A")}
                  </Message>
                ) : (
                  <Message variant="warning">Not paid</Message>
                )}
              </div>

              {/* Order Items */}
              <div className="bg-gray-100 p-6 rounded-lg shadow-sm">
                <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                  Order Items
                </h3>
                {order.orderItems.length === 0 ? (
                  <Message>Your cart is empty!</Message>
                ) : (
                  <ul>
                    {order.orderItems.map((item, idx) => (
                      <li
                        key={idx}
                        className="border-b border-gray-200 py-4 flex items-center"
                      >
                        <div className="w-16 h-16 bg-gray-200 border rounded-md flex items-center justify-center">
                          <img
                            className="object-cover w-full h-full"
                            src={item.image}
                            alt={item.name}
                          />
                        </div>
                        <div className="ml-4 flex-1">
                          <Link
                            to={`/${item.slug}`}
                            className="text-gray-900 font-semibold hover:underline"
                          >
                            {item.name}
                          </Link>
                          <div className="text-gray-600 mt-1">
                            {item.qty} x ${item.price} = $
                            {Number(item.qty * item.price).toFixed(2)}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
                <div className="mt-6">
                  <div className="flex justify-between text-gray-900 font-semibold">
                    <span>Total Price:</span>
                    <span>${total}</span>
                  </div>
                  <p className="text-gray-900 text-sm font-medium mt-4 mb-2">
                    Including:
                  </p>

                  <ul>
                    <li className="flex justify-between text-gray-900 text-sm font-thin">
                      <span>* Shipping Price:</span>
                      <span>${shippingPrice}</span>
                    </li>
                    <li className="flex justify-between text-gray-900 text-sm font-thin">
                      <span>* Tax Price (20%):</span>
                      <span>${taxPrice}</span>
                    </li>
                  </ul>
                  {!order.isPaid && order.paymentMethod === "Stripe" && (
                    <button
                      onClick={createPaymentSession}
                      className="mt-4 w-full py-3 bg-black text-white rounded-lg  flex items-center justify-center"
                    >
                      <BiCreditCard size={24} className="mr-2" />
                      <span>Pay with Credit/Debit Card</span>
                    </button>
                  )}

                  {!order.isPaid && order.paymentMethod === "PayPal" && (
                    <div className="mt-6">
                      {isPending ? (
                        <Spinner />
                      ) : (
                        <PayPalButtons
                          createOrder={createOrder}
                          onApprove={onApprove}
                          onError={onError}
                        ></PayPalButtons>
                      )}
                      <div className="mt-2 p-4 bg-gray-100 border border-gray-200 rounded-lg shadow-lg animate-fadeIn">
                        <p>
                          <strong>Email:</strong> testaccount@instrumental.com
                        </p>
                        <p>
                          <strong>Password:</strong> 12345678
                        </p>
                      </div>
                    </div>
                  )}

                  {paymentLoading && <Spinner />}
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </Layout>
  );
};

export default Order;
