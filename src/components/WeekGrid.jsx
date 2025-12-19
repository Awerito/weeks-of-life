import { useState, useEffect } from "react";
import WeekCell from "./WeekCell";
import WeekGridHeader from "./WeekGridHeader";
import Legend from "./Legend";
import PosterDownload from "./PosterDownload";

const GAP = 2; // px

function getCellSize() {
  const height = window.innerHeight;
  if (height <= 720) return 8;
  if (height <= 1080) return 13;
  return 18; // 2K+
}

function getWeekText(week, stats) {
  if (week >= stats.totalWeeks && week < stats.weeksLived)
    return "A bonus week beyond expectancy";
  if (week === stats.midpointWeek) return "The midpoint of your life";
  if (week < stats.weeksLived) return "A week from your past";
  if (week === stats.weeksLived) return "Your current week";
  return "A week in your potential future";
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
  const displayWeek = hoverWeek ?? stats.weeksLived;
  const weekText = getWeekText(displayWeek, stats);

  return (
    <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
      <WeekGridHeader
        stats={stats}
        sex={sex}
        displayWeek={displayWeek}
        weekText={weekText}
      />

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
            onHover={setHoverWeek}
            onLeave={() => setHoverWeek(null)}
          />
        ))}
      </div>

      {/* Desktop: week message below grid */}
      <div className="hidden md:block mt-4 text-sm text-gray-600 dark:text-gray-300">
        Week {displayWeek + 1}: {weekText}
      </div>

      <Legend hasExtra={stats.extraWeeks > 0} />
      <PosterDownload stats={stats} sex={sex} />
    </div>
  );
}
