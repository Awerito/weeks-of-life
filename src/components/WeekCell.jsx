export default function WeekCell({
  weekNumber,
  isPast,
  isCurrent,
  isMidpoint,
  sex,
  size,
  gap,
  onHover,
  onLeave,
}) {
  let className = "rounded-sm transition-all ";

  if (isMidpoint) {
    className += "bg-red-500 ring-1 ring-red-300";
  } else if (isCurrent) {
    className += "bg-amber-400 animate-pulse";
  } else if (isPast) {
    className += sex === "female" ? "bg-rose-400" : "bg-sky-400";
  } else {
    className += "bg-gray-200";
  }

  return (
    <div
      style={{ width: size + gap, height: size + gap, padding: gap / 2 }}
      onMouseEnter={() => onHover(weekNumber)}
      onMouseLeave={onLeave}
    >
      <div className={className} style={{ width: size, height: size }} />
    </div>
  );
}
