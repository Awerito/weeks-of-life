import { useTranslation, Trans } from "react-i18next";
import { formatNumber } from "../../utils/format";

export default function LifeNumbers({ stats }) {
  const { t } = useTranslation();

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
      <h2 className="text-lg font-medium mb-4 text-gray-800 dark:text-gray-100">
        {t("stats.lifeNumbers.title")}
      </h2>
      <div className="space-y-3 text-gray-600 dark:text-gray-300">
        <p>
          <Trans
            i18nKey="stats.lifeNumbers.weeksLived"
            values={{ weeks: formatNumber(stats.weeksLived), percent: stats.percentageLived }}
            components={{ strong: <span className="text-gray-900 dark:text-gray-100 font-medium" /> }}
          />
        </p>
        <p>
          <Trans
            i18nKey="stats.lifeNumbers.daysExperience"
            values={{ days: formatNumber(stats.daysLived), seasons: formatNumber(stats.seasons) }}
            components={{ strong: <span className="text-gray-900 dark:text-gray-100 font-medium" /> }}
          />
        </p>
        <p>
          <Trans
            i18nKey="stats.lifeNumbers.heartbeats"
            values={{ count: formatNumber(stats.heartbeats) }}
            components={{ strong: <span className="text-gray-900 dark:text-gray-100 font-medium" /> }}
          />
        </p>
        <p>
          <Trans
            i18nKey="stats.lifeNumbers.breathsSleep"
            values={{ breaths: formatNumber(stats.breaths), hours: formatNumber(stats.hoursSlept) }}
            components={{ strong: <span className="text-gray-900 dark:text-gray-100 font-medium" /> }}
          />
        </p>
      </div>
    </div>
  );
}
