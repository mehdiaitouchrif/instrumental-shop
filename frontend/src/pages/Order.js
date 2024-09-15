import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import Message from "../components/Message";
import useOrdersContext from "../hooks/useOrdersContext";
import { toast } from "react-toastify";
import { BiCreditCard } from "react-icons/bi";
import Spinner from "../components/Spinner";

const Order = () => {
  const {
    getOrder,
    order,
    loading,
    paymentLoading,
    error,
    createStripeSession,
  } = useOrdersContext();

  const params = useParams();

  useEffect(() => {
    getOrder(params.id);

    if (error) {
      toast.error(error);
    }

    // eslint-disable-next-line
  }, [params.id]);

  const createPaymentSession = () => {
    console.log(order._id);
    createStripeSession(order._id);
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto my-8 md:mb-60">
        <h2 className="text-2xl uppercase my-2 text-gray-700">
          Order #{params.id}{" "}
        </h2>
        {loading ? (
          <Spinner />
        ) : error ? (
          <h1>{error}</h1>
        ) : (
          order && (
            <div className="grid grid-cols-12 md:gap-16 text-gray-700">
              <div className="col-span-12 md:col-span-8">
                <ul>
                  <li className="py-4 border-b border-gray-100">
                    <h2 className="text-2xl uppercase my-2 text-gray-700">
                      Shipping
                    </h2>
                    <p className="my-2">
                      <strong>Full Name: </strong>
                      {order.user.firstName} {order.user.lastName}{" "}
                    </p>
                    <p className="my-2">
                      <strong>Email: </strong>{" "}
                      <a href={`mailto:${order.user.email}`}>
                        {order.user.email}
                      </a>
                    </p>
                    <p className="my-2">
                      <strong>Address: </strong>
                      {order.shippingAddress.address},{" "}
                      {order.shippingAddress.city},{" "}
                      {order.shippingAddress.postalCode},{" "}
                      {order.shippingAddress.country}
                    </p>
                    {order.isDelivered ? (
                      <Message variant="success">
                        Delivered on {order.deliveredAt}
                      </Message>
                    ) : (
                      <Message variant="danger">Not delivered</Message>
                    )}
                  </li>
                  <li className="py-4 border-b border-gray-100">
                    <h2 className="text-2xl uppercase my-2 text-gray-700">
                      Payment method
                    </h2>
                    <p>
                      <strong>Method: </strong>
                      {order.paymentMethod}
                    </p>

                    {order.isPaid ? (
                      <Message variant="success">
                        Paid on {order.paidAt}
                      </Message>
                    ) : (
                      <Message variant="danger">Not paid</Message>
                    )}
                  </li>
                  <li className="py-4 border-b border-gray-100">
                    <h2 className="text-2xl uppercase my-4 text-gray-700">
                      Orders items
                    </h2>
                    {order.orderItems.length === 0 ? (
                      <Message>Your cart is empty!</Message>
                    ) : (
                      order.orderItems.map((item, idx) => (
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
                {!order.isPaid && (
                  <button
                    onClick={createPaymentSession}
                    className="flex items-center justify-between py-3 px-6 rounded-sm bg-black text-white uppercase my-6 hover:bg-gray-800"
                  >
                    <BiCreditCard size={24} className="mr-2" />
                    <p>Pay with Card</p>
                  </button>
                )}
                {paymentLoading && <Spinner />}
              </div>
            </div>
          )
        )}
      </div>
    </Layout>
  );
};

export default Order;
