export default function InputForm({ birthdate, sex, onBirthdateChange, onSexChange, onSubmit }) {
  const canSubmit = birthdate && sex;

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm space-y-6">
      <div>
        <label htmlFor="birthdate" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
          Enter your birth date
        </label>
        <input
          id="birthdate"
          name="birthdate"
          type="date"
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-gray-400 focus:border-transparent"
          value={birthdate}
          onChange={(e) => onBirthdateChange(e.target.value)}
        />
      </div>

      <div>
        <span id="sex-label" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
          Select your sex
        </span>
        <div className="flex gap-4" role="group" aria-labelledby="sex-label">
          <button
            type="button"
            onClick={() => onSexChange("male")}
            aria-pressed={sex === "male"}
            className={`flex-1 p-3 rounded-lg border-2 transition-all ${
              sex === "male"
                ? "border-sky-400 bg-sky-50 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300"
                : "border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-500"
            }`}
          >
            Male
          </button>
          <button
            type="button"
            onClick={() => onSexChange("female")}
            aria-pressed={sex === "female"}
            className={`flex-1 p-3 rounded-lg border-2 transition-all ${
              sex === "female"
                ? "border-rose-400 bg-rose-50 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300"
                : "border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-500"
            }`}
          >
            Female
          </button>
        </div>
      </div>

      <button
        onClick={onSubmit}
        disabled={!canSubmit}
        className="w-full bg-gray-800 dark:bg-gray-100 text-white dark:text-gray-800 py-3 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-200 transition-colors disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:cursor-not-allowed"
      >
        Visualize your time
      </button>
    </div>
  );
}
