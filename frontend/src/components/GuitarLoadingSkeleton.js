const GuitarLoadingSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 p-8 from-gray-50 bg-gradient-to-tr bg-gray-100 shadow-sm rounded-md my-12">
      <div className="flex flex-col items-center mb-4 md:mb-0 md:items-start justify-center animate-pulse">
        <div className="bg-gray-200 h-8 w-4/5 rounded mb-4"></div>{" "}
        <div className="bg-gray-200 h-10 w-32 rounded"></div>{" "}
      </div>
      <div className="h-72 animate-pulse">
        <div className="bg-gray-200 w-full h-full rounded"></div>{" "}
      </div>
    </div>
  );
};

export default GuitarLoadingSkeleton;
