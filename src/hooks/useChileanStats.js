import { useState, useEffect } from "react";

const CACHE_KEY = "chilean-stats-cache";
const CACHE_DURATION = 1000 * 60 * 60 * 24 * 7; // 1 week

const FALLBACK_DATA = {
  lifeExpectancy: { male: 77.5, female: 82.8 },
  population: 19500000,
  birthRate: 8.9,
  deathRate: 6.5,
  dataYear: null,
};

const INDICATORS = {
  maleLifeExp: "SP.DYN.LE00.MA.IN",
  femaleLifeExp: "SP.DYN.LE00.FE.IN",
  population: "SP.POP.TOTL",
  birthRate: "SP.DYN.CBRT.IN",
  deathRate: "SP.DYN.CDRT.IN",
};

async function fetchIndicator(indicator) {
  const url = `https://api.worldbank.org/v2/country/CL/indicator/${indicator}?format=json&per_page=5`;
  const response = await fetch(url);
  const data = await response.json();

  if (!data[1]) return null;

  // Find the most recent non-null value
  const record = data[1].find((r) => r.value !== null);
  return record ? { value: record.value, year: record.date } : null;
}

function getCachedData() {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;

    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp > CACHE_DURATION) {
      localStorage.removeItem(CACHE_KEY);
      return null;
    }

    return data;
  } catch {
    return null;
  }
}

function setCachedData(data) {
  try {
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ data, timestamp: Date.now() })
    );
  } catch {
    // localStorage might be full or disabled
  }
}

export function useChileanStats() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchStats() {
      // Check cache first
      const cached = getCachedData();
      if (cached) {
        setStats(cached);
        setLoading(false);
        return;
      }

      try {
        const [maleLifeExp, femaleLifeExp, population, birthRate, deathRate] =
          await Promise.all([
            fetchIndicator(INDICATORS.maleLifeExp),
            fetchIndicator(INDICATORS.femaleLifeExp),
            fetchIndicator(INDICATORS.population),
            fetchIndicator(INDICATORS.birthRate),
            fetchIndicator(INDICATORS.deathRate),
          ]);

        const data = {
          lifeExpectancy: {
            male: maleLifeExp?.value ?? FALLBACK_DATA.lifeExpectancy.male,
            female: femaleLifeExp?.value ?? FALLBACK_DATA.lifeExpectancy.female,
          },
          population: population?.value ?? FALLBACK_DATA.population,
          birthRate: birthRate?.value ?? FALLBACK_DATA.birthRate,
          deathRate: deathRate?.value ?? FALLBACK_DATA.deathRate,
          dataYear: maleLifeExp?.year ?? null,
        };

        setCachedData(data);
        setStats(data);
      } catch (err) {
        setError(err);
        setStats(FALLBACK_DATA);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  // Calculate derived values
  const derivedStats = stats
    ? {
        ...stats,
        birthsPerDay: Math.round(
          (stats.population * stats.birthRate) / 1000 / 365
        ),
        deathsPerDay: Math.round(
          (stats.population * stats.deathRate) / 1000 / 365
        ),
      }
    : null;

  return { stats: derivedStats, loading, error };
}
