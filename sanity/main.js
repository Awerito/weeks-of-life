import { useState, useRef } from "react";

const TRANSLATIONS = {
  "es-ES": {
    pageTitle: "La vida en semanas",
    pageSubtitle: "Una visualización basada en la esperanza de vida chilena",
    birthDateQuestion: "Ingresa tu fecha de nacimiento",
    sexQuestion: "Selecciona tu sexo",
    male: "Hombre",
    female: "Mujer",
    visualizeButton: "Visualizar tu tiempo",
    startOverButton: "Empezar de nuevo",
    lifeInWeeksTitle: "Tu vida en semanas",
    lifeExpectancy: "Esperanza de vida en Chile:",
    years: "años",
    weekHoverPast: " Una semana de tu pasado",
    weekHoverCurrent: " Tu semana actual",
    weekHoverFuture: " Una semana en tu futuro potencial",
    weekHoverMidpoint: " La mitad de tu vida",
    legendPast: "Vivido",
    legendPresent: "Ahora",
    legendFuture: "Por vivir",
    legendMidpoint: "50%",
    downloadPoster: "Descargar póster",
    format16x9: "16:9 (Horizontal)",
    format9x16: "9:16 (Vertical)",
    lifeHighlightsTitle: "Tu vida en números",
    lifeHighlightsWeeks: "Has vivido",
    lifeHighlightsWeeksEnd: "semanas, que es el",
    lifeHighlightsPercent: "de tu esperanza de vida.",
    lifeHighlightsDays: "Eso son",
    lifeHighlightsDaysEnd: "días de experiencia y aproximadamente",
    lifeHighlightsSeasonsEnd: "estaciones observadas.",
    lifeHighlightsHeartbeats: "Tu corazón ha latido aproximadamente",
    lifeHighlightsHeartbeatsEnd: "veces.",
    lifeHighlightsBreaths: "Has tomado alrededor de",
    lifeHighlightsBreathsMiddle: "respiraciones y has dormido aproximadamente",
    lifeHighlightsBreathsEnd: "horas.",
    societalContextTitle: "Contexto chileno",
    societalPopulation:
      "Durante tu vida, la población de Chile ha crecido de aproximadamente",
    societalPopulationEnd: "a más de",
    societalPopulationFinal: "millones de personas.",
    societalMeetings: "La persona promedio conocerá alrededor de",
    societalMeetingsMiddle:
      "personas en su vida. Probablemente ya has conocido aproximadamente",
    societalMeetingsEnd: "individuos.",
    societalBirthsDeaths:
      "Desde tu nacimiento, en Chile han nacido aproximadamente",
    societalBirthsMiddle: "personas y han fallecido",
    societalDeathsEnd: "personas.",
    cosmicPerspectiveTitle: "Perspectiva cósmica",
    cosmicEarthTravel:
      "Desde tu nacimiento, la Tierra ha viajado aproximadamente",
    cosmicEarthTravelEnd: "kilómetros a través del espacio alrededor del Sol.",
    cosmicUniverse: "El universo observable tiene aproximadamente",
    cosmicUniverseMiddle:
      "mil millones de años luz de diámetro. Tu vida es solo el",
    cosmicUniverseEnd: "de la edad del universo.",
    cosmicSolarSystem:
      "Durante tu vida, nuestro sistema solar se ha movido aproximadamente",
    cosmicSolarSystemEnd: "kilómetros a través de la Vía Láctea.",
    naturalWorldTitle: "Mundo natural",
    naturalLunarCycles: "Has experimentado aproximadamente",
    naturalLunarMiddle: "ciclos lunares y",
    naturalLunarEnd: "viajes alrededor del Sol.",
    naturalSequoia:
      "Un alerce patagónico puede vivir más de 3,600 años. Tu edad actual es el",
    naturalSequoiaEnd: "de su vida potencial.",
    naturalCells:
      "Durante tu vida, tu cuerpo ha reemplazado la mayoría de sus células varias veces. No estás hecho de los mismos átomos con los que naciste.",
  },
};

const t = (key) => TRANSLATIONS["es-ES"][key] || key;

const LIFE_EXPECTANCY = {
  male: 77.5,
  female: 82.8,
};

export default function WeeksOfLife() {
  const [step, setStep] = useState(1);
  const [birthdate, setBirthdate] = useState("");
  const [sex, setSex] = useState("");
  const [stats, setStats] = useState(null);
  const [showHoverData, setShowHoverData] = useState(false);
  const [hoverWeek, setHoverWeek] = useState(null);
  const [downloading, setDownloading] = useState(false);

  const calculateStats = (date, selectedSex) => {
    const birthDate = new Date(date);
    const today = new Date();
    const birthYear = birthDate.getFullYear();

    const lifeExpectancyYears = LIFE_EXPECTANCY[selectedSex];
    const totalWeeks = Math.round(lifeExpectancyYears * 52);
    const midpointWeek = Math.floor(totalWeeks / 2);

    const msInWeek = 1000 * 60 * 60 * 24 * 7;
    const weeksLived = Math.floor((today - birthDate) / msInWeek);

    const weeksRemaining = Math.max(0, totalWeeks - weeksLived);
    const percentageLived = Math.min(
      100,
      Math.round((weeksLived / totalWeeks) * 100),
    );

    const msInDay = 1000 * 60 * 60 * 24;
    const daysLived = Math.floor((today - birthDate) / msInDay);

    const hoursSlept = Math.floor(daysLived * 8);
    const heartbeats = Math.floor(daysLived * 24 * 60 * 70);
    const breaths = Math.floor(daysLived * 24 * 60 * 16);
    const seasons = Math.floor(daysLived / 91.25);

    return {
      weeksLived,
      totalWeeks,
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
    };
  };

  const getChilePopulationAtYear = (year) => {
    const populationData = {
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
    const years = Object.keys(populationData).map(Number);
    const closestYear = years.reduce((prev, curr) =>
      Math.abs(curr - year) < Math.abs(prev - year) ? curr : prev,
    );
    return populationData[closestYear];
  };

  const getChileBirthsPerDay = () => 580;
  const getChileDeathsPerDay = () => 310;

  const handleSubmit = () => {
    if (birthdate && sex) {
      setStats(calculateStats(birthdate, sex));
      setStep(2);
    }
  };

  const getFormattedNumber = (num) => {
    return new Intl.NumberFormat("es-CL").format(num);
  };

  const generatePosterSVG = (format) => {
    if (!stats) return null;

    const is16x9 = format === "16x9";
    const width = is16x9 ? 1920 : 1080;
    const height = is16x9 ? 1080 : 1920;

    const weeksPerRow = 52;
    const totalRows = Math.ceil(stats.totalWeeks / weeksPerRow);

    const gridPadding = is16x9 ? 120 : 80;
    const availableWidth = width - gridPadding * 2;
    const availableHeight = height - (is16x9 ? 280 : 400);

    const cellSize = Math.min(
      Math.floor(availableWidth / weeksPerRow) - 1,
      Math.floor(availableHeight / totalRows) - 1,
    );
    const gap = 2;

    const gridWidth = weeksPerRow * (cellSize + gap);
    const gridHeight = totalRows * (cellSize + gap);
    const startX = (width - gridWidth) / 2;
    const startY = is16x9 ? 180 : 280;

    const pastColor = sex === "female" ? "#fb7185" : "#38bdf8";
    const futureColor = "#e5e7eb";
    const currentColor = "#fbbf24";
    const midpointColor = "#ef4444";

    let cells = "";
    for (let row = 0; row < totalRows; row++) {
      for (let col = 0; col < weeksPerRow; col++) {
        const weekNumber = row * weeksPerRow + col;
        if (weekNumber < stats.totalWeeks) {
          const x = startX + col * (cellSize + gap);
          const y = startY + row * (cellSize + gap);

          let color;
          if (weekNumber === stats.midpointWeek) {
            color = midpointColor;
          } else if (weekNumber === stats.weeksLived) {
            color = currentColor;
          } else if (weekNumber < stats.weeksLived) {
            color = pastColor;
          } else {
            color = futureColor;
          }

          cells += `<rect x="${x}" y="${y}" width="${cellSize}" height="${cellSize}" rx="2" fill="${color}"/>`;
        }
      }
    }

    const title = "LA VIDA EN SEMANAS";
    const subtitle = `Esperanza de vida: ${stats.lifeExpectancyYears} años (${sex === "female" ? "Mujer" : "Hombre"})`;
    const lived = `${getFormattedNumber(stats.weeksLived)} semanas vividas (${stats.percentageLived}%)`;

    const legendY = startY + gridHeight + 40;
    const legendSpacing = is16x9 ? 180 : 140;
    const legendStartX = (width - 4 * legendSpacing) / 2;

    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
        <rect width="${width}" height="${height}" fill="#fafafa"/>
        
        <text x="${width / 2}" y="${is16x9 ? 70 : 100}" text-anchor="middle" font-family="system-ui, sans-serif" font-size="${is16x9 ? 48 : 56}" font-weight="600" fill="#1f2937">${title}</text>
        <text x="${width / 2}" y="${is16x9 ? 115 : 155}" text-anchor="middle" font-family="system-ui, sans-serif" font-size="${is16x9 ? 24 : 28}" fill="#6b7280">${subtitle}</text>
        <text x="${width / 2}" y="${is16x9 ? 150 : 195}" text-anchor="middle" font-family="system-ui, sans-serif" font-size="${is16x9 ? 20 : 24}" fill="#9ca3af">${lived}</text>
        
        ${cells}
        
        <rect x="${legendStartX}" y="${legendY}" width="20" height="20" rx="3" fill="${pastColor}"/>
        <text x="${legendStartX + 28}" y="${legendY + 15}" font-family="system-ui, sans-serif" font-size="16" fill="#6b7280">Vivido</text>
        
        <rect x="${legendStartX + legendSpacing}" y="${legendY}" width="20" height="20" rx="3" fill="${currentColor}"/>
        <text x="${legendStartX + legendSpacing + 28}" y="${legendY + 15}" font-family="system-ui, sans-serif" font-size="16" fill="#6b7280">Ahora</text>
        
        <rect x="${legendStartX + legendSpacing * 2}" y="${legendY}" width="20" height="20" rx="3" fill="${midpointColor}"/>
        <text x="${legendStartX + legendSpacing * 2 + 28}" y="${legendY + 15}" font-family="system-ui, sans-serif" font-size="16" fill="#6b7280">50% de vida</text>
        
        <rect x="${legendStartX + legendSpacing * 3}" y="${legendY}" width="20" height="20" rx="3" fill="${futureColor}"/>
        <text x="${legendStartX + legendSpacing * 3 + 28}" y="${legendY + 15}" font-family="system-ui, sans-serif" font-size="16" fill="#6b7280">Por vivir</text>
      </svg>
    `;

    return svg;
  };

  const downloadPoster = async (format) => {
    setDownloading(true);
    const svg = generatePosterSVG(format);

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const is16x9 = format === "16x9";
    canvas.width = is16x9 ? 1920 : 1080;
    canvas.height = is16x9 ? 1080 : 1920;

    const img = new Image();
    const svgBlob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);

      const link = document.createElement("a");
      link.download = `vida-en-semanas-${format}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
      setDownloading(false);
    };

    img.src = url;
  };

  const renderWeekGrid = () => {
    if (!stats) return null;

    const rows = [];
    const weeksPerRow = 52;
    const totalRows = Math.ceil(stats.totalWeeks / weeksPerRow);

    for (let row = 0; row < totalRows; row++) {
      const weekCells = [];
      for (let col = 0; col < weeksPerRow; col++) {
        const weekNumber = row * weeksPerRow + col;
        if (weekNumber < stats.totalWeeks) {
          const isPast = weekNumber < stats.weeksLived;
          const isCurrent = weekNumber === stats.weeksLived;
          const isMidpoint = weekNumber === stats.midpointWeek;

          let cellClass = "w-2 h-2 m-0.5 rounded-sm transition-all ";
          if (isMidpoint) {
            cellClass += "bg-red-500 ring-1 ring-red-300 ";
          } else if (isCurrent) {
            cellClass += "bg-amber-400 animate-pulse ";
          } else if (isPast) {
            cellClass += sex === "female" ? "bg-rose-400 " : "bg-sky-400 ";
          } else {
            cellClass += "bg-gray-200 ";
          }

          weekCells.push(
            <div
              key={weekNumber}
              className={cellClass}
              onMouseEnter={() => {
                setHoverWeek(weekNumber);
                setShowHoverData(true);
              }}
              onMouseLeave={() => setShowHoverData(false)}
            />,
          );
        }
      }
      rows.push(
        <div key={row} className="flex">
          {weekCells}
        </div>,
      );
    }

    const colorClass = sex === "female" ? "bg-rose-400" : "bg-sky-400";

    return (
      <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-medium mb-2 text-gray-800">
          {t("lifeInWeeksTitle")}
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          {t("lifeExpectancy")}{" "}
          <span className="font-medium">
            {stats.lifeExpectancyYears} {t("years")}
          </span>{" "}
          ({sex === "female" ? t("female") : t("male")})
        </p>
        <div className="flex flex-col">{rows}</div>

        {showHoverData && (
          <div className="mt-4 text-sm text-gray-600">
            Semana {hoverWeek + 1}:
            {hoverWeek === stats.midpointWeek
              ? t("weekHoverMidpoint")
              : hoverWeek < stats.weeksLived
                ? t("weekHoverPast")
                : hoverWeek === stats.weeksLived
                  ? t("weekHoverCurrent")
                  : t("weekHoverFuture")}
          </div>
        )}

        <div className="flex flex-wrap mt-6 text-sm gap-4">
          <div className="flex items-center">
            <div className={`w-3 h-3 ${colorClass} rounded-sm mr-2`}></div>
            <span className="text-gray-600">{t("legendPast")}</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-amber-400 rounded-sm mr-2"></div>
            <span className="text-gray-600">{t("legendPresent")}</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-500 rounded-sm mr-2"></div>
            <span className="text-gray-600">{t("legendMidpoint")}</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-gray-200 rounded-sm mr-2"></div>
            <span className="text-gray-600">{t("legendFuture")}</span>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-100">
          <p className="text-sm text-gray-600 mb-3">{t("downloadPoster")}</p>
          <div className="flex gap-3">
            <button
              onClick={() => downloadPoster("16x9")}
              disabled={downloading}
              className="flex-1 px-4 py-2 bg-gray-800 text-white text-sm rounded-lg hover:bg-gray-700 transition-colors disabled:bg-gray-400"
            >
              {t("format16x9")}
            </button>
            <button
              onClick={() => downloadPoster("9x16")}
              disabled={downloading}
              className="flex-1 px-4 py-2 bg-gray-800 text-white text-sm rounded-lg hover:bg-gray-700 transition-colors disabled:bg-gray-400"
            >
              {t("format9x16")}
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderStats = () => {
    if (!stats) return null;

    return (
      <div className="mt-6 space-y-4">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-medium mb-4 text-gray-800">
            {t("lifeHighlightsTitle")}
          </h2>
          <div className="space-y-3 text-gray-600">
            <p>
              {t("lifeHighlightsWeeks")}{" "}
              <span className="text-gray-900 font-medium">
                {getFormattedNumber(stats.weeksLived)}
              </span>{" "}
              {t("lifeHighlightsWeeksEnd")}{" "}
              <span className="text-gray-900 font-medium">
                {stats.percentageLived}%
              </span>{" "}
              {t("lifeHighlightsPercent")}
            </p>
            <p>
              {t("lifeHighlightsDays")}{" "}
              <span className="text-gray-900 font-medium">
                {getFormattedNumber(stats.daysLived)}
              </span>{" "}
              {t("lifeHighlightsDaysEnd")}{" "}
              <span className="text-gray-900 font-medium">
                {getFormattedNumber(stats.seasons)}
              </span>{" "}
              {t("lifeHighlightsSeasonsEnd")}
            </p>
            <p>
              {t("lifeHighlightsHeartbeats")}{" "}
              <span className="text-gray-900 font-medium">
                {getFormattedNumber(stats.heartbeats)}
              </span>{" "}
              {t("lifeHighlightsHeartbeatsEnd")}
            </p>
            <p>
              {t("lifeHighlightsBreaths")}{" "}
              <span className="text-gray-900 font-medium">
                {getFormattedNumber(stats.breaths)}
              </span>{" "}
              {t("lifeHighlightsBreathsMiddle")}{" "}
              <span className="text-gray-900 font-medium">
                {getFormattedNumber(stats.hoursSlept)}
              </span>{" "}
              {t("lifeHighlightsBreathsEnd")}
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-medium mb-4 text-gray-800">
            {t("societalContextTitle")}
          </h2>
          <div className="space-y-3 text-gray-600">
            <p>
              {t("societalPopulation")}{" "}
              <span className="text-gray-900 font-medium">
                {getChilePopulationAtYear(stats.birthYear)}
              </span>{" "}
              {t("societalPopulationEnd")}{" "}
              <span className="text-gray-900 font-medium">19,5</span>{" "}
              {t("societalPopulationFinal")}
            </p>
            <p>
              {t("societalMeetings")}{" "}
              <span className="text-gray-900 font-medium">80.000</span>{" "}
              {t("societalMeetingsMiddle")}{" "}
              <span className="text-gray-900 font-medium">
                {getFormattedNumber(
                  Math.round(80000 * (stats.percentageLived / 100)),
                )}
              </span>{" "}
              {t("societalMeetingsEnd")}
            </p>
            <p>
              {t("societalBirthsDeaths")}{" "}
              <span className="text-gray-900 font-medium">
                {getFormattedNumber(
                  Math.round(stats.daysLived * getChileBirthsPerDay()),
                )}
              </span>{" "}
              {t("societalBirthsMiddle")}{" "}
              <span className="text-gray-900 font-medium">
                {getFormattedNumber(
                  Math.round(stats.daysLived * getChileDeathsPerDay()),
                )}
              </span>{" "}
              {t("societalDeathsEnd")}
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-medium mb-4 text-gray-800">
            {t("cosmicPerspectiveTitle")}
          </h2>
          <div className="space-y-3 text-gray-600">
            <p>
              {t("cosmicEarthTravel")}{" "}
              <span className="text-gray-900 font-medium">
                {getFormattedNumber(
                  Math.round(stats.daysLived * 2.57 * 1000000),
                )}
              </span>{" "}
              {t("cosmicEarthTravelEnd")}
            </p>
            <p>
              {t("cosmicUniverse")}{" "}
              <span className="text-gray-900 font-medium">93</span>{" "}
              {t("cosmicUniverseMiddle")}{" "}
              <span className="text-gray-900 font-medium">
                {((80 / 13800000000) * 100).toFixed(10)}%
              </span>{" "}
              {t("cosmicUniverseEnd")}
            </p>
            <p>
              {t("cosmicSolarSystem")}{" "}
              <span className="text-gray-900 font-medium">
                {getFormattedNumber(Math.round(stats.daysLived * 24 * 828000))}
              </span>{" "}
              {t("cosmicSolarSystemEnd")}
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-medium mb-4 text-gray-800">
            {t("naturalWorldTitle")}
          </h2>
          <div className="space-y-3 text-gray-600">
            <p>
              {t("naturalLunarCycles")}{" "}
              <span className="text-gray-900 font-medium">
                {getFormattedNumber(Math.round(stats.daysLived / 29.53))}
              </span>{" "}
              {t("naturalLunarMiddle")}{" "}
              <span className="text-gray-900 font-medium">
                {getFormattedNumber(Math.floor(stats.daysLived / 365.25))}
              </span>{" "}
              {t("naturalLunarEnd")}
            </p>
            <p>
              {t("naturalSequoia")}{" "}
              <span className="text-gray-900 font-medium">
                {((stats.daysLived / 365.25 / 3600) * 100).toFixed(3)}%
              </span>{" "}
              {t("naturalSequoiaEnd")}
            </p>
            <p>{t("naturalCells")}</p>
          </div>
        </div>
      </div>
    );
  };

  const handleReset = () => {
    setBirthdate("");
    setSex("");
    setStats(null);
    setStep(1);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 pt-12">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-semibold text-gray-800 mb-1">
          {t("pageTitle")}
        </h1>
        <p className="text-gray-500 mb-8">{t("pageSubtitle")}</p>

        {step === 1 ? (
          <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t("birthDateQuestion")}
              </label>
              <input
                type="date"
                className="w-full p-3 border border-gray-300 rounded-lg text-gray-800 focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t("sexQuestion")}
              </label>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setSex("male")}
                  className={`flex-1 p-3 rounded-lg border-2 transition-all ${
                    sex === "male"
                      ? "border-sky-400 bg-sky-50 text-sky-700"
                      : "border-gray-200 text-gray-600 hover:border-gray-300"
                  }`}
                >
                  {t("male")}
                </button>
                <button
                  type="button"
                  onClick={() => setSex("female")}
                  className={`flex-1 p-3 rounded-lg border-2 transition-all ${
                    sex === "female"
                      ? "border-rose-400 bg-rose-50 text-rose-700"
                      : "border-gray-200 text-gray-600 hover:border-gray-300"
                  }`}
                >
                  {t("female")}
                </button>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={!birthdate || !sex}
              className="w-full bg-gray-800 text-white py-3 rounded-lg hover:bg-gray-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {t("visualizeButton")}
            </button>
          </div>
        ) : (
          <>
            {renderWeekGrid()}
            {renderStats()}
            <button
              onClick={handleReset}
              className="mt-6 w-full bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition-colors"
            >
              {t("startOverButton")}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
