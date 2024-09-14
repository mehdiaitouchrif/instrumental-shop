import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import Layout from "../components/Layout";
import Meta from "../components/Meta";

import useOrdersContext from "../hooks/useOrdersContext";

const SuccessPayment = () => {
  const { orderId } = useParams();

  const { updateToPaid, isPaymentSuccessful, paymentLoading } =
    useOrdersContext();

  const navigate = useNavigate();

  useEffect(() => {
    updateToPaid(orderId);

    if (isPaymentSuccessful) {
      navigate(`/orders/${orderId}`);
    }

    //eslint-disable-next-line
  }, [orderId, isPaymentSuccessful]);

  return (
    <Layout>
      <Meta title="Successfull Payment | Instrumental Shop" />
      {paymentLoading && <Spinner />}
    </Layout>
  );
};

export default SuccessPayment;
