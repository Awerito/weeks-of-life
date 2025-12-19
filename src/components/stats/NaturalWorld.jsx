import { formatNumber } from "../../utils/format";

export default function NaturalWorld({ stats }) {
  const cypressAgePercent = ((stats.daysLived / 365.25 / 3600) * 100).toFixed(3);

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
      <h2 className="text-lg font-medium mb-4 text-gray-800 dark:text-gray-100">Natural world</h2>
      <div className="space-y-3 text-gray-600 dark:text-gray-300">
        <p>
          You have experienced approximately{" "}
          <span className="text-gray-900 dark:text-gray-100 font-medium">
            {formatNumber(stats.lunarCycles)}
          </span>{" "}
          lunar cycles and{" "}
          <span className="text-gray-900 dark:text-gray-100 font-medium">
            {formatNumber(stats.solarTrips)}
          </span>{" "}
          trips around the Sun.
        </p>
        <p>
          A Patagonian cypress can live over 3,600 years. Your current age is{" "}
          <span className="text-gray-900 dark:text-gray-100 font-medium">{cypressAgePercent}%</span>{" "}
          of its potential lifespan.
        </p>
        <p>
          During your lifetime, your body has replaced most of its cells several
          times. You are not made of the same atoms you were born with.
        </p>
      </div>
    </div>
  );
}
