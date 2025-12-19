import { useTranslation, Trans } from "react-i18next";
import { formatNumber } from "../../utils/format";

export default function ChileanContext({ stats, chileanStats }) {
  const { t } = useTranslation();
  const currentPopulation = (chileanStats.population / 1000000).toFixed(1);
  const peopleMet = Math.round(80000 * (stats.percentageLived / 100));
  const birthsSinceBirth = Math.round(stats.daysLived * chileanStats.birthsPerDay);
  const deathsSinceBirth = Math.round(stats.daysLived * chileanStats.deathsPerDay);

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
      <h2 className="text-lg font-medium mb-4 text-gray-800 dark:text-gray-100">
        {t("stats.chilean.title")}
      </h2>
      <div className="space-y-3 text-gray-600 dark:text-gray-300">
        <p>
          <Trans
            i18nKey="stats.chilean.population"
            values={{ million: currentPopulation }}
            components={{ strong: <span className="text-gray-900 dark:text-gray-100 font-medium" /> }}
          />
        </p>
        <p>
          <Trans
            i18nKey="stats.chilean.peopleMet"
            values={{ count: formatNumber(peopleMet) }}
            components={{ strong: <span className="text-gray-900 dark:text-gray-100 font-medium" /> }}
          />
        </p>
        <p>
          <Trans
            i18nKey="stats.chilean.birthsDeaths"
            values={{ births: formatNumber(birthsSinceBirth), deaths: formatNumber(deathsSinceBirth) }}
            components={{ strong: <span className="text-gray-900 dark:text-gray-100 font-medium" /> }}
          />
        </p>
      </div>
    </div>
  );
}
