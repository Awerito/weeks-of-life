export default function InputForm({ birthdate, sex, onBirthdateChange, onSexChange, onSubmit }) {
  const canSubmit = birthdate && sex;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
      <div>
        <label htmlFor="birthdate" className="block text-sm font-medium text-gray-700 mb-2">
          Enter your birth date
        </label>
        <input
          id="birthdate"
          name="birthdate"
          type="date"
          className="w-full p-3 border border-gray-300 rounded-lg text-gray-800 focus:ring-2 focus:ring-gray-400 focus:border-transparent"
          value={birthdate}
          onChange={(e) => onBirthdateChange(e.target.value)}
        />
      </div>

      <div>
        <span id="sex-label" className="block text-sm font-medium text-gray-700 mb-2">
          Select your sex
        </span>
        <div className="flex gap-4" role="group" aria-labelledby="sex-label">
          <button
            type="button"
            onClick={() => onSexChange("male")}
            aria-pressed={sex === "male"}
            className={`flex-1 p-3 rounded-lg border-2 transition-all ${
              sex === "male"
                ? "border-sky-400 bg-sky-50 text-sky-700"
                : "border-gray-200 text-gray-600 hover:border-gray-300"
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
                ? "border-rose-400 bg-rose-50 text-rose-700"
                : "border-gray-200 text-gray-600 hover:border-gray-300"
            }`}
          >
            Female
          </button>
        </div>
      </div>

      <button
        onClick={onSubmit}
        disabled={!canSubmit}
        className="w-full bg-gray-800 text-white py-3 rounded-lg hover:bg-gray-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        Visualize your time
      </button>
    </div>
  );
}
