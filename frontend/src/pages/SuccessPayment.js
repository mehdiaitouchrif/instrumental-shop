import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "../components/Layout";
import Meta from "../components/Meta";

import useOrdersContext from "../hooks/useOrdersContext";

const SuccessPayment = () => {
  const { orderId } = useParams();

  const { updateToPaid } = useOrdersContext();

  useEffect(() => {
    updateToPaid(orderId);

    //eslint-disable-next-line
  }, [orderId]);

  return (
    <Layout>
      <Meta title="Successfull Payment | Instrumental Shop" />
      <div className="max-w-xl mx-auto flex flex-col items-center justify-center mt-20">
        <div className="w-40">
          <img className="w-full" src="/img/payment.svg" alt="Secure payment" />
        </div>
        <p className="my-4 text-xl">Your Payment is Successfull</p>
        <Link
          to={`/orders/${orderId}`}
          className="font-medium my-4 hover:underline hover:text-blue-700 "
        >
          View order
        </Link>
      </div>
    </Layout>
  );
};

export default SuccessPayment;
