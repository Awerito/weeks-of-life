import { useTranslation } from "react-i18next";

export default function LanguageToggle() {
  const { i18n, t } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "es" ? "en" : "es";
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
      aria-label={t("language.title")}
      title={t("language.title")}
    >
      <span className="w-5 h-5 text-sm font-medium text-gray-600 dark:text-gray-300 flex items-center justify-center">
        {i18n.language === "es" ? "EN" : "ES"}
      </span>
    </button>
  );
}
