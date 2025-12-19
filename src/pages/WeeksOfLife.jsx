import { useState } from "react";
import confetti from "canvas-confetti";
import { useLifeStats } from "../hooks/useLifeStats";
import InputForm from "../components/InputForm";
import WeekGrid from "../components/WeekGrid";
import LifeNumbers from "../components/stats/LifeNumbers";
import ChileanContext from "../components/stats/ChileanContext";
import CosmicPerspective from "../components/stats/CosmicPerspective";
import NaturalWorld from "../components/stats/NaturalWorld";

function fireConfetti() {
  const duration = 3000;
  const end = Date.now() + duration;

  const frame = () => {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.6 },
      colors: ["#10b981", "#34d399", "#6ee7b7"],
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.6 },
      colors: ["#10b981", "#34d399", "#6ee7b7"],
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  };

  frame();
}

export default function WeeksOfLife() {
  const [birthdate, setBirthdate] = useState("");
  const [sex, setSex] = useState("");
  const { stats, calculateStats, reset } = useLifeStats();

  const handleSubmit = () => {
    if (birthdate && sex) {
      const result = calculateStats(birthdate, sex);
      if (result.extraWeeks > 0) {
        fireConfetti();
      }
    }
  };

  const handleReset = () => {
    setBirthdate("");
    setSex("");
    reset();
  };

  const showResults = stats !== null;

  return (
    <div className="min-h-screen bg-gray-50 p-6 pt-12">
      <div className="w-[90%] mx-auto">
        <h1 className="text-2xl font-semibold text-gray-800 mb-1">
          Life in weeks
        </h1>
        <p className="text-gray-500 mb-8">
          A visualization based on Chilean life expectancy
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
            <div className="mt-6 space-y-4">
              <LifeNumbers stats={stats} />
              <ChileanContext stats={stats} />
              <CosmicPerspective stats={stats} />
              <NaturalWorld stats={stats} />
            </div>
            <button
              onClick={handleReset}
              className="mt-6 w-full bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Start over
            </button>
          </>
        )}
      </div>
    </div>
  );
}
