import { useTranslation, Trans } from "react-i18next";
import { formatNumber } from "../../utils/format";

export default function CosmicPerspective({ stats }) {
  const { t } = useTranslation();
  const earthTravelKm = Math.round(stats.daysLived * 2.57 * 1000000);
  const solarSystemTravelKm = Math.round(stats.daysLived * 24 * 828000);
  const universeAgePercent = ((80 / 13800000000) * 100).toFixed(10);

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
      <h2 className="text-lg font-medium mb-4 text-gray-800 dark:text-gray-100">
        {t("stats.cosmic.title")}
      </h2>
      <div className="space-y-3 text-gray-600 dark:text-gray-300">
        <p>
          <Trans
            i18nKey="stats.cosmic.earthTravel"
            values={{ km: formatNumber(earthTravelKm) }}
            components={{ strong: <span className="text-gray-900 dark:text-gray-100 font-medium" /> }}
          />
        </p>
        <p>
          <Trans
            i18nKey="stats.cosmic.universe"
            values={{ percent: universeAgePercent }}
            components={{ strong: <span className="text-gray-900 dark:text-gray-100 font-medium" /> }}
          />
        </p>
        <p>
          <Trans
            i18nKey="stats.cosmic.solarSystem"
            values={{ km: formatNumber(solarSystemTravelKm) }}
            components={{ strong: <span className="text-gray-900 dark:text-gray-100 font-medium" /> }}
          />
        </p>
      </div>
    </div>
  );
}
