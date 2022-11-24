import { Link } from "react-router-dom";
import {
  CiDeliveryTruck,
  CiCreditCard1,
  CiLogin,
  CiBoxes,
} from "react-icons/ci";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 md:gap-6 my-8">
      <div>
        {step1 ? (
          <Link
            to="/login"
            className="flex items-center gap-2 md:text-lg hover:text-orange-600"
          >
            <CiLogin size={20} />
            <p>Sign In</p>
          </Link>
        ) : (
          <div className="text-gray-500 hover:cursor-not-allowed flex items-center gap-2 text-lg">
            <CiLogin size={20} />
            <p>Sign In</p>
          </div>
        )}
      </div>
      <div>
        {step2 ? (
          <Link
            to="/shipping"
            className="flex items-center gap-2 text-lg hover:text-orange-600"
          >
            <CiDeliveryTruck size={20} />
            <p>Shipping</p>
          </Link>
        ) : (
          <div className="text-gray-500 hover:cursor-not-allowed flex items-center gap-2 text-lg">
            <CiDeliveryTruck size={20} />
            <p>Shipping</p>
          </div>
        )}
      </div>
      <div>
        {step3 ? (
          <Link
            to="/payment"
            className="flex items-center gap-2 text-lg hover:text-orange-600"
          >
            <CiCreditCard1 size={20} />
            <p>Payment</p>
          </Link>
        ) : (
          <div className="text-gray-500 hover:cursor-not-allowed flex items-center gap-2 text-lg">
            <CiCreditCard1 size={20} />
            <p>Payment</p>
          </div>
        )}
      </div>
      <div>
        {step4 ? (
          <Link
            to="/placeorder"
            className="flex items-center gap-2 text-lg hover:text-orange-600"
          >
            <CiBoxes />
            <p>Place order</p>
          </Link>
        ) : (
          <div className="text-gray-500 hover:cursor-not-allowed flex items-center gap-2 text-lg">
            <CiBoxes />
            <p>Place order</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutSteps;
