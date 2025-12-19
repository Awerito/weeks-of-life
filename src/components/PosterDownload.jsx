import { useState } from "react";
import { formatNumber } from "../utils/format";

export default function PosterDownload({ stats, sex }) {
  const [downloading, setDownloading] = useState(false);

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
      Math.floor(availableHeight / totalRows) - 1
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

    const title = "LIFE IN WEEKS";
    const subtitle = `Life expectancy: ${stats.lifeExpectancyYears} years (${sex === "female" ? "Female" : "Male"})`;
    const lived = `${formatNumber(stats.weeksLived)} weeks lived (${stats.percentageLived}%)`;

    const legendY = startY + gridHeight + 40;
    const legendSpacing = is16x9 ? 180 : 140;
    const legendStartX = (width - 4 * legendSpacing) / 2;

    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
        <rect width="${width}" height="${height}" fill="#fafafa"/>

        <text x="${width / 2}" y="${is16x9 ? 70 : 100}" text-anchor="middle" font-family="system-ui, sans-serif" font-size="${is16x9 ? 48 : 56}" font-weight="600" fill="#1f2937">${title}</text>
        <text x="${width / 2}" y="${is16x9 ? 115 : 155}" text-anchor="middle" font-family="system-ui, sans-serif" font-size="${is16x9 ? 24 : 28}" fill="#6b7280">${subtitle}</text>
        <text x="${width / 2}" y="${is16x9 ? 150 : 195}" text-anchor="middle" font-family="system-ui, sans-serif" font-size="${is16x9 ? 20 : 24}" fill="#9ca3af">${lived}</text>

        ${cells}

        <rect x="${legendStartX}" y="${legendY}" width="20" height="20" rx="3" fill="${pastColor}"/>
        <text x="${legendStartX + 28}" y="${legendY + 15}" font-family="system-ui, sans-serif" font-size="16" fill="#6b7280">Lived</text>

        <rect x="${legendStartX + legendSpacing}" y="${legendY}" width="20" height="20" rx="3" fill="${currentColor}"/>
        <text x="${legendStartX + legendSpacing + 28}" y="${legendY + 15}" font-family="system-ui, sans-serif" font-size="16" fill="#6b7280">Now</text>

        <rect x="${legendStartX + legendSpacing * 2}" y="${legendY}" width="20" height="20" rx="3" fill="${midpointColor}"/>
        <text x="${legendStartX + legendSpacing * 2 + 28}" y="${legendY + 15}" font-family="system-ui, sans-serif" font-size="16" fill="#6b7280">50% of life</text>

        <rect x="${legendStartX + legendSpacing * 3}" y="${legendY}" width="20" height="20" rx="3" fill="${futureColor}"/>
        <text x="${legendStartX + legendSpacing * 3 + 28}" y="${legendY + 15}" font-family="system-ui, sans-serif" font-size="16" fill="#6b7280">Yet to live</text>
      </svg>
    `;
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
      link.download = `life-in-weeks-${format}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
      setDownloading(false);
    };

    img.src = url;
  };

  return (
    <div className="mt-6 pt-4 border-t border-gray-100">
      <p className="text-sm text-gray-600 mb-3">Download poster</p>
      <div className="flex gap-3">
        <button
          onClick={() => downloadPoster("16x9")}
          disabled={downloading}
          className="flex-1 px-4 py-2 bg-gray-800 text-white text-sm rounded-lg hover:bg-gray-700 transition-colors disabled:bg-gray-400"
        >
          16:9 (Landscape)
        </button>
        <button
          onClick={() => downloadPoster("9x16")}
          disabled={downloading}
          className="flex-1 px-4 py-2 bg-gray-800 text-white text-sm rounded-lg hover:bg-gray-700 transition-colors disabled:bg-gray-400"
        >
          9:16 (Portrait)
        </button>
      </div>
    </div>
  );
}
