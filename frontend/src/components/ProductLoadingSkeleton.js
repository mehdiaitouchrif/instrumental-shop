const ProductLoadingSkeleton = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 my-12">
        <div
          className="bg-gray-100 flex flex-col relative items-center justify-center p-4 animate-pulse"
          style={{ height: 500 }}
        >
          <div className="bg-gray-300 h-full w-2/3 rounded"></div>{" "}
        </div>
        <div className="flex flex-col md:mt-12 p-4 animate-pulse">
          <div className="bg-gray-300 h-8 w-full rounded mb-2"></div>{" "}
          <div className="bg-gray-300 h-8 w-1/2 rounded mb-8"></div>{" "}
          <div className="bg-gray-300 h-32 w-3/4 rounded mb-3"></div>{" "}
          <div className="bg-gray-200 h-6 w-24 my-8 rounded mb-3"></div>{" "}
          <div className="bg-gray-200 h-10 w-60 rounded"></div>{" "}
        </div>
      </div>
      <div className="my-16 px-4 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap28">
        <div className="col-span-2 my-4 md:my-8">
          <h2 className="uppercase font-medium text-3xl my-4 animate-pulse">
            Features
          </h2>
          <div className="animate-pulse bg-gray-200 h-28 w-full rounded mb-4"></div>
        </div>
        <div className="my-4 md:my-8">
          <h2 className="uppercase font-medium text-3xl my-4 animate-pulse">
            In the box
          </h2>
          <div className="animate-pulse bg-gray-200 h-10 w-full rounded mb-4"></div>
          <div className="animate-pulse bg-gray-200 h-10 w-full rounded mb-4"></div>
          <div className="animate-pulse bg-gray-200 h-10 w-full rounded mb-4"></div>
        </div>
      </div>

      <div className="my-8 md:my-16 p-4 hidden md:grid grid-cols-2 gap-4">
        <div className="bg-gray-50">
          <div className="animate-pulse bg-gray-200 h-80 rounded"></div>
        </div>
        <div className="bg-gray-50">
          <div className="animate-pulse bg-gray-200 h-80 rounded"></div>
        </div>
      </div>

      <div className="my-8 md:my-16">
        <h2 className="text-3xl uppercase text-center font-medium text-gray-900 my-4 md:my-8 animate-pulse">
          You may also like
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-16">
          <div className="p-4">
            <div className="bg-gray-50">
              <div className="animate-pulse bg-gray-300 h-80 rounded"></div>
            </div>
            <div className="my-2 text-center p-4">
              <div className="animate-pulse bg-gray-300 h-8 w-full rounded mb-2"></div>
              <div className="animate-pulse bg-gray-300 h-10 w-full rounded"></div>
            </div>
          </div>
          <div className="p-4">
            <div className="bg-gray-50">
              <div className="animate-pulse bg-gray-300 h-80 rounded"></div>
            </div>
            <div className="my-2 text-center p-4">
              <div className="animate-pulse bg-gray-300 h-8 w-full rounded mb-2"></div>
              <div className="animate-pulse bg-gray-300 h-10 w-full rounded"></div>
            </div>
          </div>
          <div className="p-4">
            <div className="bg-gray-50">
              <div className="animate-pulse bg-gray-300 h-80 rounded"></div>
            </div>
            <div className="my-2 text-center p-4">
              <div className="animate-pulse bg-gray-300 h-8 w-full rounded mb-2"></div>
              <div className="animate-pulse bg-gray-300 h-10 w-full rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductLoadingSkeleton;
