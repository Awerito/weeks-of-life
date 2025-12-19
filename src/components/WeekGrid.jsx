import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import WeekCell from "./WeekCell";
import WeekGridHeader from "./WeekGridHeader";
import Legend from "./Legend";
import PosterDownload from "./PosterDownload";
import milestones from "../data/milestones.json";

const DEBUG_MILESTONES = false;
const milestoneWeeks = new Set(milestones.map((m) => m.weekStart));

const GAP = 2; // px

function getCellSize() {
  const height = window.innerHeight;
  if (height <= 720) return 8;
  if (height <= 1080) return 13;
  return 18; // 2K+
}

function getMilestoneForWeek(week) {
  const ageYears = Math.floor(week / 52);
  const matching = milestones.filter((m) => m.ageYears === ageYears);
  if (matching.length === 0) return null;
  return matching.map((m) => `${m.person} ${m.achievement}`).join(" • ");
}

function getWeekText(week, stats, t) {
  const milestone = getMilestoneForWeek(week);
  if (milestone) return milestone;

  if (week >= stats.totalWeeks && week < stats.weeksLived) {
    const bonusNumber = week - stats.totalWeeks + 1;
    return t("weekText.bonusWeek", { number: bonusNumber });
  }
  if (week === stats.midpointWeek) return t("weekText.midpoint");
  if (week < stats.weeksLived) return t("weekText.weekLived");
  if (week === stats.weeksLived) return t("weekText.currentWeek");
  return t("weekText.weekToLive");
}

export default function WeekGrid({ stats, sex }) {
  const { t } = useTranslation();
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
  const weekText = getWeekText(displayWeek, stats, t);

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
            isExtra={
              weekNumber >= stats.totalWeeks && weekNumber < stats.weeksLived
            }
            hasMilestone={DEBUG_MILESTONES && milestoneWeeks.has(weekNumber)}
            onHover={setHoverWeek}
            onLeave={() => setHoverWeek(null)}
          />
        ))}
      </div>

      {/* Desktop: week message below grid */}
      <div className="hidden md:block mt-4 text-sm text-gray-600 dark:text-gray-300">
        {t("grid.week", { number: displayWeek + 1, text: weekText })}
      </div>

      <Legend hasExtra={stats.extraWeeks > 0} />
      <PosterDownload stats={stats} sex={sex} />
    </div>
  );
}
