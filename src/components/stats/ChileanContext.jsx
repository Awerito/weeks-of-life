import { formatNumber } from "../../utils/format";

export default function ChileanContext({ stats, chileanStats }) {
  const currentPopulation = (chileanStats.population / 1000000).toFixed(1);
  const peopleMet = Math.round(80000 * (stats.percentageLived / 100));
  const birthsSinceBirth = Math.round(stats.daysLived * chileanStats.birthsPerDay);
  const deathsSinceBirth = Math.round(stats.daysLived * chileanStats.deathsPerDay);

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
      <h2 className="text-lg font-medium mb-4 text-gray-800 dark:text-gray-100">Chilean context</h2>
      <div className="space-y-3 text-gray-600 dark:text-gray-300">
        <p>
          Chile currently has a population of approximately{" "}
          <span className="text-gray-900 dark:text-gray-100 font-medium">{currentPopulation}</span>{" "}
          million people.
        </p>
        <p>
          The average person will meet around{" "}
          <span className="text-gray-900 dark:text-gray-100 font-medium">80,000</span> people in
          their lifetime. You have probably already met approximately{" "}
          <span className="text-gray-900 dark:text-gray-100 font-medium">
            {formatNumber(peopleMet)}
          </span>{" "}
          individuals.
        </p>
        <p>
          Since your birth, approximately{" "}
          <span className="text-gray-900 dark:text-gray-100 font-medium">
            {formatNumber(birthsSinceBirth)}
          </span>{" "}
          people have been born in Chile and{" "}
          <span className="text-gray-900 dark:text-gray-100 font-medium">
            {formatNumber(deathsSinceBirth)}
          </span>{" "}
          have passed away.
        </p>
      </div>
    </div>
  );
}
