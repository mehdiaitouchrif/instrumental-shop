const CarouselLoadingSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 min-h-80 md:my-6">
      {/* Left Column Skeleton */}
      <div className=" p-4 order-2 md:order-1">
        <div className="h-6 w-3/4 animate-pulse bg-gray-800 rounded mb-10"></div>
        <div className="h-9 animate-pulse bg-gray-800 rounded mb-4"></div>

        <div className="h-3 animate-pulse bg-gray-800 rounded mb-10"></div>
        <div className="h-3 w-3/4 animate-pulse bg-gray-800 rounded mb-4"></div>

        <div className="h-8 w-24 animate-pulse bg-gray-800 rounded"></div>
      </div>

      {/* Right Column Skeleton */}
      <div className="flex justify-center items-center order-1 md:order-2">
        <div className="bg-gray-700 animate-pulse w-64 h-64 rounded-lg relative p-4">
          {/* Piano Body */}
          <div className="bg-gray-800 w-5/6 h-3/5 rounded-lg absolute bottom-0 left-1/2 transform -translate-x-1/2"></div>
          {/* Piano Keys */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
            <div className="grid grid-cols-7 gap-1 w-5/6">
              {/* White Keys */}
              <div className="bg-white w-1/7 h-4/5 rounded-lg"></div>
              <div className="bg-white w-1/7 h-4/5 rounded-lg"></div>
              <div className="bg-white w-1/7 h-4/5 rounded-lg"></div>
              <div className="bg-white w-1/7 h-4/5 rounded-lg"></div>
              <div className="bg-white w-1/7 h-4/5 rounded-lg"></div>
              <div className="bg-white w-1/7 h-4/5 rounded-lg"></div>
              <div className="bg-white w-1/7 h-4/5 rounded-lg"></div>
              {/* Black Keys */}
              <div className="bg-black w-1/14 h-3/5 rounded-lg absolute top-0 -mt-3/5"></div>
              <div className="bg-black w-1/14 h-3/5 rounded-lg absolute top-0 -mt-3/5 left-1/7"></div>
              <div className="bg-black w-1/14 h-3/5 rounded-lg absolute top-0 -mt-3/5 left-2/7"></div>
              <div className="bg-black w-1/14 h-3/5 rounded-lg absolute top-0 -mt-3/5 left-3/7"></div>
              <div className="bg-black w-1/14 h-3/5 rounded-lg absolute top-0 -mt-3/5 left-4/7"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarouselLoadingSkeleton;
