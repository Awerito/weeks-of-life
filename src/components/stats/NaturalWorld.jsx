import { useTranslation, Trans } from "react-i18next";
import { formatNumber } from "../../utils/format";

export default function NaturalWorld({ stats }) {
  const { t } = useTranslation();
  const cypressAgePercent = ((stats.daysLived / 365.25 / 3600) * 100).toFixed(3);

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
      <h2 className="text-lg font-medium mb-4 text-gray-800 dark:text-gray-100">
        {t("stats.natural.title")}
      </h2>
      <div className="space-y-3 text-gray-600 dark:text-gray-300">
        <p>
          <Trans
            i18nKey="stats.natural.lunarCycles"
            values={{ lunar: formatNumber(stats.lunarCycles), solar: formatNumber(stats.solarTrips) }}
            components={{ strong: <span className="text-gray-900 dark:text-gray-100 font-medium" /> }}
          />
        </p>
        <p>
          <Trans
            i18nKey="stats.natural.cypress"
            values={{ percent: cypressAgePercent }}
            components={{ strong: <span className="text-gray-900 dark:text-gray-100 font-medium" /> }}
          />
        </p>
        <p>
          {t("stats.natural.cells")}
        </p>
      </div>
    </div>
  );
}
