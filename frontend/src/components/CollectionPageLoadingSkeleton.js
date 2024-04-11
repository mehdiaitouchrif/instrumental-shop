import React from "react";

const CollectionPageLoadingSkeleton = ({ idx }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 my-12">
      <div
        className={`flex flex-col justify-center animate-pulse ${
          idx % 2 !== 0 && "md:order-2"
        }`}
      >
        <div className="bg-gray-300 h-8 w-3/4 rounded mb-4"></div>{" "}
        <div className="bg-gray-300 h-20 w-5/6 rounded mb-4"></div>{" "}
        <div className="bg-gray-300 h-10 w-40 rounded"></div>{" "}
      </div>
      <div
        className={`bg-gray-50 flex flex-col items-center justify-center p-4 animate-pulse ${
          idx % 2 === 0 && "md:order-1"
        }`}
        style={{ height: 500 }}
      >
        <div className="bg-gray-200 h-full w-2/3 rounded"></div>{" "}
      </div>
    </div>
  );
};

export default CollectionPageLoadingSkeleton;
