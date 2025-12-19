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
  const [showHoverData, setShowHoverData] = useState(false);
  const [hoverWeek, setHoverWeek] = useState(null);
  const [cellSize, setCellSize] = useState(getCellSize);

  useEffect(() => {
    const handleResize = () => setCellSize(getCellSize());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalSize = cellSize + GAP;

  if (!stats) return null;

  const weeks = Array.from({ length: stats.totalWeeks }, (_, i) => i);

  const handleHover = (weekNumber) => {
    setHoverWeek(weekNumber);
    setShowHoverData(true);
  };

  const handleLeave = () => {
    setShowHoverData(false);
  };

  const getHoverText = () => {
    if (hoverWeek === stats.midpointWeek) return " The midpoint of your life";
    if (hoverWeek < stats.weeksLived) return " A week from your past";
    if (hoverWeek === stats.weeksLived) return " Your current week";
    return " A week in your potential future";
  };

  return (
    <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-lg font-medium mb-2 text-gray-800">
        Your life in weeks
      </h2>
      <p className="text-sm text-gray-500 mb-4">
        Life expectancy in Chile:{" "}
        <span className="font-medium">{stats.lifeExpectancyYears} years</span>{" "}
        ({sex === "female" ? "Female" : "Male"})
      </p>

      <div
        className="grid w-full"
        style={{
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
            sex={sex}
            size={cellSize}
            gap={GAP}
            onHover={handleHover}
            onLeave={handleLeave}
          />
        ))}
      </div>

      {showHoverData && (
        <div className="mt-4 text-sm text-gray-600">
          Week {hoverWeek + 1}:{getHoverText()}
        </div>
      )}

      <Legend sex={sex} />
      <PosterDownload stats={stats} sex={sex} />
    </div>
  );
}
