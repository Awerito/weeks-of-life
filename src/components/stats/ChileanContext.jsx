import { formatNumber } from "../../utils/format";
import {
  getPopulationAtYear,
  CURRENT_POPULATION,
  BIRTHS_PER_DAY,
  DEATHS_PER_DAY,
} from "../../utils/chileanData";

export default function ChileanContext({ stats }) {
  const birthYearPopulation = getPopulationAtYear(stats.birthYear);
  const peopleMet = Math.round(80000 * (stats.percentageLived / 100));
  const birthsSinceBirth = Math.round(stats.daysLived * BIRTHS_PER_DAY);
  const deathsSinceBirth = Math.round(stats.daysLived * DEATHS_PER_DAY);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-lg font-medium mb-4 text-gray-800">Chilean context</h2>
      <div className="space-y-3 text-gray-600">
        <p>
          During your lifetime, Chile's population has grown from approximately{" "}
          <span className="text-gray-900 font-medium">{birthYearPopulation}</span>{" "}
          to over{" "}
          <span className="text-gray-900 font-medium">{CURRENT_POPULATION}</span>{" "}
          million people.
        </p>
        <p>
          The average person will meet around{" "}
          <span className="text-gray-900 font-medium">80,000</span> people in
          their lifetime. You have probably already met approximately{" "}
          <span className="text-gray-900 font-medium">
            {formatNumber(peopleMet)}
          </span>{" "}
          individuals.
        </p>
        <p>
          Since your birth, approximately{" "}
          <span className="text-gray-900 font-medium">
            {formatNumber(birthsSinceBirth)}
          </span>{" "}
          people have been born in Chile and{" "}
          <span className="text-gray-900 font-medium">
            {formatNumber(deathsSinceBirth)}
          </span>{" "}
          have passed away.
        </p>
      </div>
    </div>
  );
}
