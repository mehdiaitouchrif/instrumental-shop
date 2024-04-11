const PianoLoadingSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-12">
      <div className="from-slate-200 bg-gradient-to-b rounded-xl border h-80 animate-pulse">
        <div className="h-full w-full p-4 bg-gray-300 rounded-xl"></div>
      </div>
      <div className="rounded-xl bg-gray-100 p-8 flex flex-col justify-center items-center animate-pulse">
        <div className="bg-gray-300 h-8 w-4/5 rounded mb-4"></div>
        <div className="bg-gray-300 h-8 w-3/4 rounded mb-4"></div>
        <div className="bg-gray-300 h-10 w-40 rounded mx-auto"></div>
      </div>
    </div>
  );
};

export default PianoLoadingSkeleton;
