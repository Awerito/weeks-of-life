import { useState, useCallback } from "react";

export function useLifeStats(lifeExpectancy) {
  const [stats, setStats] = useState(null);

  const calculateStats = useCallback(
    (birthdate, sex) => {
      const birthDate = new Date(birthdate);
      const today = new Date();
      const birthYear = birthDate.getFullYear();

      const lifeExpectancyYears = lifeExpectancy[sex];
      const totalWeeks = Math.round(lifeExpectancyYears * 52);
      const midpointWeek = Math.floor(totalWeeks / 2);

      const msInWeek = 1000 * 60 * 60 * 24 * 7;
      const weeksLived = Math.floor((today - birthDate) / msInWeek);

      const weeksRemaining = Math.max(0, totalWeeks - weeksLived);
      const percentageLived = Math.min(
        100,
        Math.round((weeksLived / totalWeeks) * 100)
      );

      const msInDay = 1000 * 60 * 60 * 24;
      const daysLived = Math.floor((today - birthDate) / msInDay);

      const hoursSlept = Math.floor(daysLived * 8);
      const heartbeats = Math.floor(daysLived * 24 * 60 * 70);
      const breaths = Math.floor(daysLived * 24 * 60 * 16);
      const seasons = Math.floor(daysLived / 91.25);
      const lunarCycles = Math.round(daysLived / 29.53);
      const solarTrips = Math.floor(daysLived / 365.25);

      const extraWeeks = Math.max(0, weeksLived - totalWeeks);
      const displayTotalWeeks = Math.max(totalWeeks, weeksLived + 1);

      const newStats = {
        weeksLived,
        totalWeeks,
        displayTotalWeeks,
        extraWeeks,
        midpointWeek,
        weeksRemaining,
        percentageLived,
        daysLived,
        hoursSlept,
        heartbeats,
        breaths,
        seasons,
        birthYear,
        lifeExpectancyYears,
        lunarCycles,
        solarTrips,
      };

      setStats(newStats);
      return newStats;
    },
    [lifeExpectancy]
  );

  const reset = useCallback(() => {
    setStats(null);
  }, []);

  return { stats, calculateStats, reset };
}
