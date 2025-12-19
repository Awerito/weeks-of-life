import { formatNumber } from "../../utils/format";

export default function LifeNumbers({ stats }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
      <h2 className="text-lg font-medium mb-4 text-gray-800 dark:text-gray-100">
        Your life in numbers
      </h2>
      <div className="space-y-3 text-gray-600 dark:text-gray-300">
        <p>
          You have lived{" "}
          <span className="text-gray-900 dark:text-gray-100 font-medium">
            {formatNumber(stats.weeksLived)}
          </span>{" "}
          weeks, which is{" "}
          <span className="text-gray-900 dark:text-gray-100 font-medium">
            {stats.percentageLived}%
          </span>{" "}
          of your life expectancy.
        </p>
        <p>
          That's{" "}
          <span className="text-gray-900 dark:text-gray-100 font-medium">
            {formatNumber(stats.daysLived)}
          </span>{" "}
          days of experience and approximately{" "}
          <span className="text-gray-900 dark:text-gray-100 font-medium">
            {formatNumber(stats.seasons)}
          </span>{" "}
          seasons observed.
        </p>
        <p>
          Your heart has beaten approximately{" "}
          <span className="text-gray-900 dark:text-gray-100 font-medium">
            {formatNumber(stats.heartbeats)}
          </span>{" "}
          times.
        </p>
        <p>
          You have taken around{" "}
          <span className="text-gray-900 dark:text-gray-100 font-medium">
            {formatNumber(stats.breaths)}
          </span>{" "}
          breaths and slept approximately{" "}
          <span className="text-gray-900 dark:text-gray-100 font-medium">
            {formatNumber(stats.hoursSlept)}
          </span>{" "}
          hours.
        </p>
      </div>
    </div>
  );
}
