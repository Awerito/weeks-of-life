import { memo } from "react";

function WeekCell({
  weekNumber,
  isPast,
  isCurrent,
  isMidpoint,
  sex,
  onHover,
  onLeave,
}) {
  let innerClass = "rounded-sm transition-colors w-[var(--cell-size)] h-[var(--cell-size)] ";

  if (isMidpoint) {
    innerClass += "bg-red-500 ring-1 ring-red-300";
  } else if (isCurrent) {
    innerClass += "bg-amber-400 animate-pulse";
  } else if (isPast) {
    innerClass += sex === "female" ? "bg-rose-400" : "bg-sky-400";
  } else {
    innerClass += "bg-gray-200";
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
