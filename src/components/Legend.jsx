import { useTranslation } from "react-i18next";

export default function Legend({ hasExtra }) {
  const { t } = useTranslation();

  return (
    <div className="hidden md:flex flex-wrap mt-6 text-sm gap-4">
      <div className="flex items-center">
        <div className="w-3 h-3 bg-[#3B82F6] rounded-sm mr-2"></div>
        <span className="text-gray-600 dark:text-gray-300">{t("legend.lived")}</span>
      </div>
      <div className="flex items-center">
        <div className="w-3 h-3 bg-[#10B981] rounded-sm mr-2"></div>
        <span className="text-gray-600 dark:text-gray-300">{t("legend.now")}</span>
      </div>
      <div className="flex items-center">
        <div className="w-3 h-3 bg-[#EC4899] rounded-sm mr-2"></div>
        <span className="text-gray-600 dark:text-gray-300">{t("legend.midpoint")}</span>
      </div>
      <div className="flex items-center">
        <div className="w-3 h-3 bg-gray-200 dark:bg-gray-100 rounded-sm mr-2"></div>
        <span className="text-gray-600 dark:text-gray-300">{t("legend.future")}</span>
      </div>
      {hasExtra && (
        <div className="flex items-center">
          <div className="w-3 h-3 bg-[#F5D02F] rounded-sm mr-2"></div>
          <span className="text-gray-600 dark:text-gray-300">{t("legend.bonus")}</span>
        </div>
      )}
    </div>
  );
}
