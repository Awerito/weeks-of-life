import { useState, useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import { useChileanStats } from "../hooks/useChileanStats";
import { useLifeStats } from "../hooks/useLifeStats";
import { useTheme } from "../hooks/useTheme";
import InputForm from "../components/InputForm";
import WeekGrid from "../components/WeekGrid";
import ThemeToggle from "../components/ThemeToggle";
import BuyMeCoffee from "../components/BuyMeCoffee";
import LifeNumbers from "../components/stats/LifeNumbers";
import ChileanContext from "../components/stats/ChileanContext";
import CosmicPerspective from "../components/stats/CosmicPerspective";
import NaturalWorld from "../components/stats/NaturalWorld";

const STORAGE_KEY = "weeks-of-life-data";

function getSavedData() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const data = JSON.parse(saved);
      if (data.birthdate && data.sex) {
        return data;
      }
    }
  } catch {
    localStorage.removeItem(STORAGE_KEY);
  }
  return null;
}

function fireConfetti() {
  const duration = 3000;
  const end = Date.now() + duration;

  const frame = () => {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.6 },
      colors: ["#F5D02F", "#FFE066", "#FFF4B8"],
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.6 },
      colors: ["#F5D02F", "#FFE066", "#FFF4B8"],
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  };

  frame();
}

const initialData = getSavedData();

export default function WeeksOfLife() {
  const [birthdate, setBirthdate] = useState(initialData?.birthdate ?? "");
  const [sex, setSex] = useState(initialData?.sex ?? "");
  const [hasInitialData, setHasInitialData] = useState(!!initialData);
  const { theme, toggle: toggleTheme } = useTheme();
  const hasRestoredRef = useRef(false);

  const { stats: chileanStats, loading: loadingChilean } = useChileanStats();
  const { stats, calculateStats, reset } = useLifeStats(
    chileanStats?.lifeExpectancy
  );

  // Auto-calculate stats ONLY if we had saved data at mount
  useEffect(() => {
    if (!initialData || hasRestoredRef.current || loadingChilean || !chileanStats) return;
    hasRestoredRef.current = true;
    const result = calculateStats(initialData.birthdate, initialData.sex);
    if (result.extraWeeks > 0) {
      fireConfetti();
    }
  }, [loadingChilean, chileanStats, calculateStats]);

  const handleSubmit = () => {
    if (birthdate && sex) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ birthdate, sex }));
      const result = calculateStats(birthdate, sex);
      if (result.extraWeeks > 0) {
        fireConfetti();
      }
    }
  };

  const handleReset = () => {
    localStorage.removeItem(STORAGE_KEY);
    setHasInitialData(false);
    setBirthdate("");
    setSex("");
    reset();
  };

  const showResults = stats !== null;
  const isRestoring = hasInitialData && !showResults;

  if (loadingChilean || isRestoring) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-gray-500 dark:text-gray-400">Loading data...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 pt-12 transition-colors">
      <div className="w-[90%] mx-auto">
        <div className="flex justify-between items-start mb-1">
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
            Weeks of Life
          </h1>
          <div className="flex gap-2">
            <BuyMeCoffee />
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
          </div>
        </div>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          A visualization based on Chilean life expectancy
          {chileanStats?.dataYear && (
            <span className="text-gray-400 dark:text-gray-500 text-sm ml-2">
              (data: {chileanStats.dataYear})
            </span>
          )}
        </p>

        {!showResults ? (
          <InputForm
            birthdate={birthdate}
            sex={sex}
            onBirthdateChange={setBirthdate}
            onSexChange={setSex}
            onSubmit={handleSubmit}
          />
        ) : (
          <>
            <WeekGrid stats={stats} sex={sex} />
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <LifeNumbers stats={stats} />
              <ChileanContext stats={stats} chileanStats={chileanStats} />
              <CosmicPerspective stats={stats} />
              <NaturalWorld stats={stats} />
            </div>
            <button
              onClick={handleReset}
              className="mt-6 w-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 py-3 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Start over
            </button>
          </>
        )}

        <footer className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-400 dark:text-gray-500">
          <p>
            Data source:{" "}
            <a
              href="https://data.worldbank.org/country/chile"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-gray-600 dark:hover:text-gray-300"
            >
              World Bank Open Data
            </a>
            {" | "}
            <a
              href="https://github.com/Awerito"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-gray-600 dark:hover:text-gray-300"
            >
              @Awerito
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}
