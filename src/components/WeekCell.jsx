import { memo } from "react";

function WeekCell({
  weekNumber,
  isPast,
  isCurrent,
  isMidpoint,
  isExtra,
  onHover,
  onLeave,
}) {
  let innerClass = "rounded-sm transition-colors w-[var(--cell-size)] h-[var(--cell-size)] ";

  if (isCurrent) {
    innerClass += "bg-[#10B981]";
  } else if (isExtra) {
    innerClass += "bg-[#F5D02F]";
  } else if (isMidpoint) {
    innerClass += "bg-[#EC4899] ring-1 ring-pink-300";
  } else if (isPast) {
    innerClass += "bg-[#3B82F6]";
  } else {
    innerClass += "bg-gray-200 dark:bg-gray-100";
  }

  return (
    <div
      className="w-[var(--total-size)] h-[var(--total-size)] p-[var(--gap-half)]"
      onMouseEnter={() => onHover(weekNumber)}
      onMouseLeave={onLeave}
    >
      <div className={innerClass} />
    </div>
  );
}

export default memo(WeekCell);
