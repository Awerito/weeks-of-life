export default function Legend({ hasExtra }) {
  return (
    <div className="flex flex-wrap mt-6 text-sm gap-4">
      <div className="flex items-center">
        <div className="w-3 h-3 bg-[#3B82F6] rounded-sm mr-2"></div>
        <span className="text-gray-600">Lived</span>
      </div>
      <div className="flex items-center">
        <div className="w-3 h-3 bg-[#10B981] rounded-sm mr-2"></div>
        <span className="text-gray-600">Now</span>
      </div>
      <div className="flex items-center">
        <div className="w-3 h-3 bg-[#EC4899] rounded-sm mr-2"></div>
        <span className="text-gray-600">50%</span>
      </div>
      <div className="flex items-center">
        <div className="w-3 h-3 bg-gray-200 rounded-sm mr-2"></div>
        <span className="text-gray-600">Yet to live</span>
      </div>
      {hasExtra && (
        <div className="flex items-center">
          <div className="w-3 h-3 bg-[#F5D02F] rounded-sm mr-2"></div>
          <span className="text-gray-600">Bonus weeks</span>
        </div>
      )}
    </div>
  );
}
