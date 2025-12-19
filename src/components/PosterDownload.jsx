import { useState } from "react";
import { formatNumber } from "../utils/format";

export default function PosterDownload({ stats, sex }) {
  const [downloading, setDownloading] = useState(false);

  const generatePosterSVG = (format) => {
    if (!stats) return null;

    const is16x9 = format === "16x9";
    // 2K resolution: 2560×1440 landscape, 1440×2560 portrait
    const width = is16x9 ? 2560 : 1440;
    const height = is16x9 ? 1440 : 2560;

    const pastColor = sex === "female" ? "#fb7185" : "#38bdf8";
    const futureColor = "#e5e7eb";
    const currentColor = "#fbbf24";
    const midpointColor = "#ef4444";

    const totalYears = Math.ceil(stats.totalWeeks / 52);
    let cells = "";
    let gridWidth, gridHeight, startX, startY, cellSize, gap;

    if (is16x9) {
      // Landscape: wide grid, fills left-to-right then next row
      // ~104 cols × ~45 rows (2 years per row)
      const cols = 104;
      const rows = Math.ceil(stats.totalWeeks / cols);

      const gridPadding = 120;
      const availableWidth = width - gridPadding * 2;
      const availableHeight = height - 340;

      cellSize = Math.min(
        Math.floor(availableWidth / cols) - 1,
        Math.floor(availableHeight / rows) - 1
      );
      gap = 2;

      gridWidth = cols * (cellSize + gap);
      gridHeight = rows * (cellSize + gap);
      startX = (width - gridWidth) / 2;
      startY = 220;

      // Draw grid: fills left to right, then next row (like reading)
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const weekNumber = row * cols + col;
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
    } else {
      // Portrait: weeks on X axis (columns), years on Y axis (rows)
      // Grid is 52 cols × ~90 rows - fits tall format
      const cols = 52;
      const rows = totalYears;

      const gridPadding = 80;
      const availableWidth = width - gridPadding * 2;
      const availableHeight = height - 500;

      cellSize = Math.min(
        Math.floor(availableWidth / cols) - 1,
        Math.floor(availableHeight / rows) - 1
      );
      gap = 2;

      gridWidth = cols * (cellSize + gap);
      gridHeight = rows * (cellSize + gap);
      startX = (width - gridWidth) / 2;
      startY = 340;

      // Draw grid: each row is a year, each column is a week
      for (let year = 0; year < rows; year++) {
        for (let week = 0; week < cols; week++) {
          const weekNumber = year * 52 + week;
          if (weekNumber < stats.totalWeeks) {
            const x = startX + week * (cellSize + gap);
            const y = startY + year * (cellSize + gap);

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
    }

    const title = "LIFE IN WEEKS";
    const subtitle = `Life expectancy: ${stats.lifeExpectancyYears.toFixed(1)} years (${sex === "female" ? "Female" : "Male"})`;
    const lived = `${formatNumber(stats.weeksLived)} weeks lived (${stats.percentageLived}%)`;

    const legendY = startY + gridHeight + 50;
    const legendSpacing = is16x9 ? 220 : 160;
    const legendStartX = (width - 4 * legendSpacing) / 2;

    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
        <rect width="${width}" height="${height}" fill="#fafafa"/>

        <text x="${width / 2}" y="${is16x9 ? 80 : 120}" text-anchor="middle" font-family="system-ui, sans-serif" font-size="${is16x9 ? 64 : 72}" font-weight="600" fill="#1f2937">${title}</text>
        <text x="${width / 2}" y="${is16x9 ? 140 : 190}" text-anchor="middle" font-family="system-ui, sans-serif" font-size="${is16x9 ? 32 : 36}" fill="#6b7280">${subtitle}</text>
        <text x="${width / 2}" y="${is16x9 ? 190 : 250}" text-anchor="middle" font-family="system-ui, sans-serif" font-size="${is16x9 ? 28 : 32}" fill="#9ca3af">${lived}</text>

        ${cells}

        <rect x="${legendStartX}" y="${legendY}" width="24" height="24" rx="4" fill="${pastColor}"/>
        <text x="${legendStartX + 34}" y="${legendY + 18}" font-family="system-ui, sans-serif" font-size="20" fill="#6b7280">Lived</text>

        <rect x="${legendStartX + legendSpacing}" y="${legendY}" width="24" height="24" rx="4" fill="${currentColor}"/>
        <text x="${legendStartX + legendSpacing + 34}" y="${legendY + 18}" font-family="system-ui, sans-serif" font-size="20" fill="#6b7280">Now</text>

        <rect x="${legendStartX + legendSpacing * 2}" y="${legendY}" width="24" height="24" rx="4" fill="${midpointColor}"/>
        <text x="${legendStartX + legendSpacing * 2 + 34}" y="${legendY + 18}" font-family="system-ui, sans-serif" font-size="20" fill="#6b7280">50% of life</text>

        <rect x="${legendStartX + legendSpacing * 3}" y="${legendY}" width="24" height="24" rx="4" fill="${futureColor}"/>
        <text x="${legendStartX + legendSpacing * 3 + 34}" y="${legendY + 18}" font-family="system-ui, sans-serif" font-size="20" fill="#6b7280">Yet to live</text>
      </svg>
    `;
  };

  const downloadPoster = async (format) => {
    setDownloading(true);
    const svg = generatePosterSVG(format);

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const is16x9 = format === "16x9";
    // 2K resolution
    canvas.width = is16x9 ? 2560 : 1440;
    canvas.height = is16x9 ? 1440 : 2560;

    const img = new Image();
    const svgBlob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);

      const link = document.createElement("a");
      link.download = `life-in-weeks-${format}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
      setDownloading(false);
    };

    img.src = url;
  };

  return (
    <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">Download poster</p>
      <div className="flex gap-3">
        <button
          onClick={() => downloadPoster("16x9")}
          disabled={downloading}
          className="flex-1 px-4 py-2 bg-gray-800 dark:bg-gray-100 text-white dark:text-gray-800 text-sm rounded-lg hover:bg-gray-700 dark:hover:bg-gray-200 transition-colors disabled:bg-gray-400 dark:disabled:bg-gray-500"
        >
          16:9 (Landscape)
        </button>
        <button
          onClick={() => downloadPoster("9x16")}
          disabled={downloading}
          className="flex-1 px-4 py-2 bg-gray-800 dark:bg-gray-100 text-white dark:text-gray-800 text-sm rounded-lg hover:bg-gray-700 dark:hover:bg-gray-200 transition-colors disabled:bg-gray-400 dark:disabled:bg-gray-500"
        >
          9:16 (Portrait)
        </button>
      </div>
    </div>
  );
}
