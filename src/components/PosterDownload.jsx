import { useState, useRef, useEffect } from "react";
import { formatNumber } from "../utils/format";

export default function PosterDownload({ stats, sex }) {
  const [downloading, setDownloading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const generatePosterSVG = (format, theme) => {
    if (!stats) return null;

    const is16x9 = format === "16x9";
    const isDark = theme === "dark";
    // 2K resolution: 2560×1440 landscape, 1440×2560 portrait
    const width = is16x9 ? 2560 : 1440;
    const height = is16x9 ? 1440 : 2560;

    const pastColor = sex === "female" ? "#fb7185" : "#38bdf8";
    const futureColor = isDark ? "#f3f4f6" : "#e5e7eb";
    const currentColor = "#fbbf24";
    const midpointColor = "#ef4444";
    const bgColor = isDark ? "#111827" : "#fafafa";
    const titleColor = isDark ? "#f3f4f6" : "#1f2937";
    const subtitleColor = isDark ? "#9ca3af" : "#6b7280";
    const captionColor = isDark ? "#6b7280" : "#9ca3af";

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

    const title = "WEEKS OF LIFE";
    const subtitle = `Life expectancy: ${stats.lifeExpectancyYears.toFixed(1)} years (${sex === "female" ? "Female" : "Male"})`;
    const lived = `${formatNumber(stats.weeksLived)} weeks lived (${stats.percentageLived}%)`;

    const legendY = startY + gridHeight + 50;
    const legendSpacing = is16x9 ? 220 : 160;
    const legendStartX = (width - 4 * legendSpacing) / 2;

    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
        <rect width="${width}" height="${height}" fill="${bgColor}"/>

        <text x="${width / 2}" y="${is16x9 ? 80 : 120}" text-anchor="middle" font-family="system-ui, sans-serif" font-size="${is16x9 ? 64 : 72}" font-weight="600" fill="${titleColor}">${title}</text>
        <text x="${width / 2}" y="${is16x9 ? 140 : 190}" text-anchor="middle" font-family="system-ui, sans-serif" font-size="${is16x9 ? 32 : 36}" fill="${subtitleColor}">${subtitle}</text>
        <text x="${width / 2}" y="${is16x9 ? 190 : 250}" text-anchor="middle" font-family="system-ui, sans-serif" font-size="${is16x9 ? 28 : 32}" fill="${captionColor}">${lived}</text>

        ${cells}

        <rect x="${legendStartX}" y="${legendY}" width="24" height="24" rx="4" fill="${pastColor}"/>
        <text x="${legendStartX + 34}" y="${legendY + 18}" font-family="system-ui, sans-serif" font-size="20" fill="${subtitleColor}">Lived</text>

        <rect x="${legendStartX + legendSpacing}" y="${legendY}" width="24" height="24" rx="4" fill="${currentColor}"/>
        <text x="${legendStartX + legendSpacing + 34}" y="${legendY + 18}" font-family="system-ui, sans-serif" font-size="20" fill="${subtitleColor}">Now</text>

        <rect x="${legendStartX + legendSpacing * 2}" y="${legendY}" width="24" height="24" rx="4" fill="${midpointColor}"/>
        <text x="${legendStartX + legendSpacing * 2 + 34}" y="${legendY + 18}" font-family="system-ui, sans-serif" font-size="20" fill="${subtitleColor}">50% of life</text>

        <rect x="${legendStartX + legendSpacing * 3}" y="${legendY}" width="24" height="24" rx="4" fill="${futureColor}"/>
        <text x="${legendStartX + legendSpacing * 3 + 34}" y="${legendY + 18}" font-family="system-ui, sans-serif" font-size="20" fill="${subtitleColor}">Yet to live</text>
      </svg>
    `;
  };

  const downloadPoster = async (format, theme) => {
    setDownloading(true);
    setMenuOpen(false);
    const svg = generatePosterSVG(format, theme);

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
      link.download = `life-in-weeks-${format}-${theme}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
      setDownloading(false);
    };

    img.src = url;
  };

  const options = [
    { format: "16x9", theme: "light", label: "Landscape Light" },
    { format: "16x9", theme: "dark", label: "Landscape Dark" },
    { format: "9x16", theme: "light", label: "Portrait Light" },
    { format: "9x16", theme: "dark", label: "Portrait Dark" },
  ];

  return (
    <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          disabled={downloading}
          className="w-full px-4 py-2 bg-gray-800 dark:bg-gray-100 text-white dark:text-gray-800 text-sm rounded-lg hover:bg-gray-700 dark:hover:bg-gray-200 transition-colors disabled:bg-gray-400 dark:disabled:bg-gray-500 flex items-center justify-center gap-2"
        >
          {downloading ? "Downloading..." : "Download poster"}
          {!downloading && (
            <svg
              className={`w-4 h-4 transition-transform ${menuOpen ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          )}
        </button>
        {menuOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            {options.map((opt) => (
              <button
                key={`${opt.format}-${opt.theme}`}
                onClick={() => downloadPoster(opt.format, opt.theme)}
                className="w-full px-4 py-2 text-sm text-left text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
