const PreFooter = () => {
  return (
    <div className="max-w-6xl mx-auto mt-16 mb-48 px-2 md:px-0">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
        <div className="flex flex-col justify-center">
          <h1
            className="text-4xl font-bold uppercase my-4"
            style={{ lineHeight: 1.3 }}
          >
            Bringing you the <span className="text-orange-600">best</span> music
            instruments
          </h1>
          <p className="text font-light text-gray-700">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas
            asperiores reprehenderit unde, dolorem omnis magnam aperiam saepe
            veniam sint iste dignissimos incidunt laboriosam, modi velit atque.
            Minus aliquid aut quo.
          </p>
        </div>
        <div>
          <img className="w-full rounded-xl" src="/img/prefooter.jpg" alt="" />
        </div>
      </div>
    </div>
  );
};

export default PreFooter;
