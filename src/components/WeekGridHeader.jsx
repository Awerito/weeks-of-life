export default function WeekGridHeader({ stats, sex, displayWeek, weekText }) {
  return (
    <>
      {/* Mobile: sticky header with title + legend + message */}
      <div className="md:hidden sticky top-2 z-10 -mx-6 -mt-6 mb-2">
        <div className="bg-white dark:bg-gray-800 px-6 pt-6 pb-2 rounded-t-lg shadow-[0_-16px_0_0_#f9fafb] dark:shadow-[0_-16px_0_0_#111827]">
          <h2 className="text-lg font-medium mb-2 text-gray-800 dark:text-gray-100">
            Your life in weeks
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            Life expectancy in Chile:{" "}
            <span className="font-medium">
              {stats.lifeExpectancyYears.toFixed(1)} years
            </span>{" "}
            ({sex === "female" ? "Female" : "Male"})
          </p>
          <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-500 dark:text-gray-400 mb-2">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-[#3B82F6] rounded-sm"></span> Lived
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-[#10B981] rounded-sm"></span> Now
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-[#EC4899] rounded-sm"></span> 50%
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-gray-200 rounded-sm"></span> Future
            </span>
            {stats.extraWeeks > 0 && (
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 bg-[#F5D02F] rounded-sm"></span> Bonus
              </span>
            )}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-300">
            Week {displayWeek + 1}: {weekText}
          </div>
        </div>
      </div>

      {/* Desktop: normal header */}
      <div className="hidden md:block">
        <h2 className="text-lg font-medium mb-2 text-gray-800 dark:text-gray-100">
          Your life in weeks
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Life expectancy in Chile:{" "}
          <span className="font-medium">
            {stats.lifeExpectancyYears.toFixed(1)} years
          </span>{" "}
          ({sex === "female" ? "Female" : "Male"})
        </p>
      </div>
    </>
  );
}
