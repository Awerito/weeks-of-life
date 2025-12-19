export default function Legend({ sex, hasExtra }) {
  const colorClass = sex === "female" ? "bg-rose-400" : "bg-sky-400";

  return (
    <div className="flex flex-wrap mt-6 text-sm gap-4">
      <div className="flex items-center">
        <div className={`w-3 h-3 ${colorClass} rounded-sm mr-2`}></div>
        <span className="text-gray-600">Lived</span>
      </div>
      <div className="flex items-center">
        <div className="w-3 h-3 bg-amber-400 rounded-sm mr-2"></div>
        <span className="text-gray-600">Now</span>
      </div>
      <div className="flex items-center">
        <div className="w-3 h-3 bg-red-500 rounded-sm mr-2"></div>
        <span className="text-gray-600">50%</span>
      </div>
      <div className="flex items-center">
        <div className="w-3 h-3 bg-gray-200 rounded-sm mr-2"></div>
        <span className="text-gray-600">Yet to live</span>
      </div>
      {hasExtra && (
        <div className="flex items-center">
          <div className="w-3 h-3 bg-emerald-400 rounded-sm mr-2"></div>
          <span className="text-gray-600">Bonus weeks</span>
        </div>
      )}
    </div>
  );
}
