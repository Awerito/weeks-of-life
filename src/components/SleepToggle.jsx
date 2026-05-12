import { useTranslation } from "react-i18next";

export default function SleepToggle({ active, onToggle }) {
  const { t } = useTranslation();
  const label = t("sleep.toggle");

  return (
    <button
      onClick={onToggle}
      className={`p-2 rounded-lg transition-colors ${
        active
          ? "bg-indigo-500 hover:bg-indigo-600"
          : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
      }`}
      aria-label={label}
      aria-pressed={active}
      title={label}
    >
      <svg
        className={`w-5 h-5 ${active ? "text-white" : "text-indigo-500"}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
      </svg>
    </button>
  );
}
