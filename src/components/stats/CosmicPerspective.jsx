import { formatNumber } from "../../utils/format";

export default function CosmicPerspective({ stats }) {
  const earthTravelKm = Math.round(stats.daysLived * 2.57 * 1000000);
  const solarSystemTravelKm = Math.round(stats.daysLived * 24 * 828000);
  const universeAgePercent = ((80 / 13800000000) * 100).toFixed(10);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-lg font-medium mb-4 text-gray-800">
        Cosmic perspective
      </h2>
      <div className="space-y-3 text-gray-600">
        <p>
          Since your birth, Earth has traveled approximately{" "}
          <span className="text-gray-900 font-medium">
            {formatNumber(earthTravelKm)}
          </span>{" "}
          kilometers through space around the Sun.
        </p>
        <p>
          The observable universe is approximately{" "}
          <span className="text-gray-900 font-medium">93</span> billion
          light-years in diameter. Your life is only{" "}
          <span className="text-gray-900 font-medium">{universeAgePercent}%</span>{" "}
          of the age of the universe.
        </p>
        <p>
          During your lifetime, our solar system has moved approximately{" "}
          <span className="text-gray-900 font-medium">
            {formatNumber(solarSystemTravelKm)}
          </span>{" "}
          kilometers through the Milky Way.
        </p>
      </div>
    </div>
  );
}
