const DrumLoadingSkeleton = () => {
  return (
    <div
      className="p-8 rounded-xl shadow-lg bg-gradient-to-b h-[500px]"
      style={{ background: "#d87d4a" }}
    >
      <div className="relative overflow-hidden h-full rounded-lg">
        <div className="animate-pulse absolute inset-0 bg-gray-300 rounded-lg pulse"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-32 w-32 rounded-full border-2 border-orange-200 animate-spin color-change"></div>
        </div>
      </div>
    </div>
  );
};

export default DrumLoadingSkeleton;
