import { useState, useEffect } from "react";
import WeekCell from "./WeekCell";
import Legend from "./Legend";
import PosterDownload from "./PosterDownload";

const GAP = 2; // px

function getCellSize() {
  const height = window.innerHeight;
  if (height <= 720) return 8;
  if (height <= 1080) return 13;
  return 18; // 2K+
}

export default function WeekGrid({ stats, sex }) {
  const [hoverWeek, setHoverWeek] = useState(null);
  const [cellSize, setCellSize] = useState(getCellSize);

  useEffect(() => {
    const handleResize = () => setCellSize(getCellSize());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalSize = cellSize + GAP;

  if (!stats) return null;

  const weeks = Array.from({ length: stats.displayTotalWeeks }, (_, i) => i);

  const handleHover = (weekNumber) => {
    setHoverWeek(weekNumber);
  };

  const handleLeave = () => {
    setHoverWeek(null);
  };

  const displayWeek = hoverWeek ?? stats.weeksLived;

  const getWeekText = (week) => {
    if (week >= stats.totalWeeks && week < stats.weeksLived)
      return "A bonus week beyond expectancy";
    if (week === stats.midpointWeek) return "The midpoint of your life";
    if (week < stats.weeksLived) return "A week from your past";
    if (week === stats.weeksLived) return "Your current week";
    return "A week in your potential future";
  };

  return (
    <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-lg font-medium mb-2 text-gray-800">
        Your life in weeks
      </h2>
      <p className="text-sm text-gray-500 mb-4">
        Life expectancy in Chile:{" "}
        <span className="font-medium">{stats.lifeExpectancyYears.toFixed(1)} years</span>{" "}
        ({sex === "female" ? "Female" : "Male"})
      </p>

      <div
        className="grid w-full"
        style={{
          "--cell-size": `${cellSize}px`,
          "--gap": `${GAP}px`,
          "--gap-half": `${GAP / 2}px`,
          "--total-size": `${totalSize}px`,
          gridTemplateColumns: `repeat(auto-fill, ${totalSize}px)`,
        }}
      >
        {weeks.map((weekNumber) => (
          <WeekCell
            key={weekNumber}
            weekNumber={weekNumber}
            isPast={weekNumber < stats.weeksLived}
            isCurrent={weekNumber === stats.weeksLived}
            isMidpoint={weekNumber === stats.midpointWeek}
            isExtra={weekNumber >= stats.totalWeeks && weekNumber < stats.weeksLived}
            onHover={handleHover}
            onLeave={handleLeave}
          />
        ))}
      </div>

      <div className="mt-4 text-sm text-gray-600">
        Week {displayWeek + 1}: {getWeekText(displayWeek)}
      </div>

      <Legend hasExtra={stats.extraWeeks > 0} />
      <PosterDownload stats={stats} sex={sex} />
    </div>
  );
}
