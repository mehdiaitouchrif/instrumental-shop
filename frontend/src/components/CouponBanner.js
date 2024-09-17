import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

const CouponBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative bg-gradient-to-r from-orange-500 to-yellow-400 text-white py-4 px-6 flex justify-center items-center  shadow-xl animate-slideDown">
      <p className="text-lg md:text-xl font-semibold tracking-wide animate-pulse">
        🎉 Limited Offer! Use code{" "}
        <span className="underline font-extrabold text-black bg-yellow-300 px-2 py-1 rounded-lg shadow-md">
          WELCOME2024
        </span>{" "}
        for <span className="text-black font-bold">5% off</span> until the end
        of 2024!
      </p>
      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-200 transition-transform duration-300 hover:scale-110"
        onClick={() => setIsVisible(false)}
      >
        <AiOutlineClose size={28} />
      </button>
    </div>
  );
};

export default CouponBanner;
