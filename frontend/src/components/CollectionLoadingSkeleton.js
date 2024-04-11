const CollectionLoadingSkeleton = () => {
  return (
    <div className="bg-gray-100 h-44 p-8 uppercase rounded text-center relative">
      <div
        className="animate-bounce mx-auto h-40 w-40 text-center absolute -top-28"
        style={{ left: 0, right: 0 }}
      >
        <div className="bg-gray-300 h-full w-full rounded-2xl"></div>
      </div>
      <div className="animate-pulse mt-8 flex flex-col justify-center items-center">
        <div className="bg-gray-300 h-6 w-24 rounded mb-3"></div>
        <div className="bg-gray-300 h-6 w-20 rounded"></div>
      </div>
    </div>
  );
};

export default CollectionLoadingSkeleton;
