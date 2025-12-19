export const LIFE_EXPECTANCY = {
  male: 77.5,
  female: 82.8,
};

const POPULATION_BY_YEAR = {
  1950: 6.1,
  1960: 7.6,
  1970: 9.5,
  1980: 11.2,
  1990: 13.2,
  2000: 15.4,
  2010: 17.1,
  2020: 19.1,
  2025: 19.5,
};

export const CURRENT_POPULATION = 19.5;
export const BIRTHS_PER_DAY = 580;
export const DEATHS_PER_DAY = 310;

export function getPopulationAtYear(year) {
  const years = Object.keys(POPULATION_BY_YEAR).map(Number);
  const closestYear = years.reduce((prev, curr) =>
    Math.abs(curr - year) < Math.abs(prev - year) ? curr : prev
  );
  return POPULATION_BY_YEAR[closestYear];
}
