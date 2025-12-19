import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { formatNumber } from "../utils/format";

export default function PosterDownload({ stats, sex }) {
  const { t } = useTranslation();
  const [downloading, setDownloading] = useState(false);
  const [sharing, setSharing] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [shareMenuOpen, setShareMenuOpen] = useState(false);
  const [openUpward, setOpenUpward] = useState(false);
  const [shareOpenUpward, setShareOpenUpward] = useState(false);
  const menuRef = useRef(null);
  const shareMenuRef = useRef(null);
  const buttonRef = useRef(null);
  const shareButtonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
      if (shareMenuRef.current && !shareMenuRef.current.contains(e.target)) {
        setShareMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggleMenu = () => {
    if (!menuOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const menuHeight = 176; // 4 options × 44px approx
      setOpenUpward(spaceBelow < menuHeight);
    }
    setMenuOpen(!menuOpen);
    setShareMenuOpen(false);
  };

  const handleToggleShareMenu = () => {
    if (!shareMenuOpen && shareButtonRef.current) {
      const rect = shareButtonRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const menuHeight = 176;
      setShareOpenUpward(spaceBelow < menuHeight);
    }
    setShareMenuOpen(!shareMenuOpen);
    setMenuOpen(false);
  };

  const generatePosterSVG = (format, theme) => {
    if (!stats) return null;

    const is16x9 = format === "16x9";
    const isDark = theme === "dark";
    // 2K resolution: 2560×1440 landscape, 1440×2560 portrait
    const width = is16x9 ? 2560 : 1440;
    const height = is16x9 ? 1440 : 2560;

    const pastColor = "#3B82F6";
    const futureColor = isDark ? "#f3f4f6" : "#e5e7eb";
    const currentColor = "#10B981";
    const midpointColor = "#EC4899";
    const extraColor = "#F5D02F";
    const bgColor = isDark ? "#111827" : "#fafafa";
    const titleColor = isDark ? "#f3f4f6" : "#1f2937";
    const subtitleColor = isDark ? "#9ca3af" : "#6b7280";
    const captionColor = isDark ? "#6b7280" : "#9ca3af";

    const totalYears = Math.ceil(stats.displayTotalWeeks / 52);
    const hasExtra = stats.extraWeeks > 0;
    let cells = "";
    let gridWidth, gridHeight, startX, startY, cellSize, gap;

    if (is16x9) {
      // Landscape: wide grid, fills left-to-right then next row
      // ~104 cols × ~45 rows (2 years per row)
      const cols = 104;
      const rows = Math.ceil(stats.displayTotalWeeks / cols);

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
          if (weekNumber < stats.displayTotalWeeks) {
            const x = startX + col * (cellSize + gap);
            const y = startY + row * (cellSize + gap);

            let color;
            if (weekNumber === stats.weeksLived) {
              color = currentColor;
            } else if (
              weekNumber >= stats.totalWeeks &&
              weekNumber < stats.weeksLived
            ) {
              color = extraColor;
            } else if (weekNumber === stats.midpointWeek) {
              color = midpointColor;
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
          if (weekNumber < stats.displayTotalWeeks) {
            const x = startX + week * (cellSize + gap);
            const y = startY + year * (cellSize + gap);

            let color;
            if (weekNumber === stats.weeksLived) {
              color = currentColor;
            } else if (
              weekNumber >= stats.totalWeeks &&
              weekNumber < stats.weeksLived
            ) {
              color = extraColor;
            } else if (weekNumber === stats.midpointWeek) {
              color = midpointColor;
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

    const sexLabel = sex === "female" ? t("form.female") : t("form.male");
    const title = t("poster.title");
    const subtitle = t("poster.lifeExpectancy", {
      years: stats.lifeExpectancyYears.toFixed(1),
      sex: sexLabel,
    });
    const lived = t("poster.weeksLived", {
      weeks: formatNumber(stats.weeksLived),
      percent: stats.percentageLived,
    });

    const legendY = startY + gridHeight + 50;
    const legendItems = hasExtra ? 5 : 4;
    const legendSpacing = is16x9 ? 200 : 140;
    const legendStartX = (width - legendItems * legendSpacing) / 2;

    const bonusLegend = hasExtra
      ? `
        <rect x="${legendStartX + legendSpacing * 4}" y="${legendY}" width="24" height="24" rx="4" fill="${extraColor}"/>
        <text x="${legendStartX + legendSpacing * 4 + 34}" y="${legendY + 18}" font-family="system-ui, sans-serif" font-size="20" fill="${subtitleColor}">${t("legend.bonus")}</text>
      `
      : "";

    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
        <rect width="${width}" height="${height}" fill="${bgColor}"/>

        <text x="${width / 2}" y="${is16x9 ? 80 : 120}" text-anchor="middle" font-family="system-ui, sans-serif" font-size="${is16x9 ? 64 : 72}" font-weight="600" fill="${titleColor}">${title}</text>
        <text x="${width / 2}" y="${is16x9 ? 140 : 190}" text-anchor="middle" font-family="system-ui, sans-serif" font-size="${is16x9 ? 32 : 36}" fill="${subtitleColor}">${subtitle}</text>
        <text x="${width / 2}" y="${is16x9 ? 190 : 250}" text-anchor="middle" font-family="system-ui, sans-serif" font-size="${is16x9 ? 28 : 32}" fill="${captionColor}">${lived}</text>

        ${cells}

        <rect x="${legendStartX}" y="${legendY}" width="24" height="24" rx="4" fill="${pastColor}"/>
        <text x="${legendStartX + 34}" y="${legendY + 18}" font-family="system-ui, sans-serif" font-size="20" fill="${subtitleColor}">${t("legend.lived")}</text>

        <rect x="${legendStartX + legendSpacing}" y="${legendY}" width="24" height="24" rx="4" fill="${currentColor}"/>
        <text x="${legendStartX + legendSpacing + 34}" y="${legendY + 18}" font-family="system-ui, sans-serif" font-size="20" fill="${subtitleColor}">${t("legend.now")}</text>

        <rect x="${legendStartX + legendSpacing * 2}" y="${legendY}" width="24" height="24" rx="4" fill="${midpointColor}"/>
        <text x="${legendStartX + legendSpacing * 2 + 34}" y="${legendY + 18}" font-family="system-ui, sans-serif" font-size="20" fill="${subtitleColor}">${t("poster.halfLife")}</text>

        <rect x="${legendStartX + legendSpacing * 3}" y="${legendY}" width="24" height="24" rx="4" fill="${futureColor}"/>
        <text x="${legendStartX + legendSpacing * 3 + 34}" y="${legendY + 18}" font-family="system-ui, sans-serif" font-size="20" fill="${subtitleColor}">${t("poster.yetToLive")}</text>

        ${bonusLegend}
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

  const generateImageBlob = (format, theme) => {
    return new Promise((resolve) => {
      const svg = generatePosterSVG(format, theme);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const is16x9 = format === "16x9";
      canvas.width = is16x9 ? 2560 : 1440;
      canvas.height = is16x9 ? 1440 : 2560;

      const img = new Image();
      const svgBlob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
      const url = URL.createObjectURL(svgBlob);

      img.onload = () => {
        ctx.drawImage(img, 0, 0);
        URL.revokeObjectURL(url);
        canvas.toBlob((blob) => resolve(blob), "image/png");
      };

      img.src = url;
    });
  };

  const sharePoster = async (format, theme) => {
    setSharing(true);
    setShareMenuOpen(false);

    try {
      const blob = await generateImageBlob(format, theme);

      if (!blob) {
        alert(t("poster.alertFailed"));
        setSharing(false);
        return;
      }

      const file = new File([blob], `life-in-weeks-${format}-${theme}.png`, {
        type: "image/png",
      });

      const shareText = t("poster.shareText", {
        weeks: stats.weeksLived,
        percent: stats.percentageLived,
      });

      const shareData = {
        title: t("poster.shareTitle"),
        text: shareText,
        files: [file],
      };

      // Check if Web Share API with files is supported
      if (navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else if (navigator.share) {
        // Fallback: share without file (just text/url)
        await navigator.share({
          title: t("poster.shareTitle"),
          text: shareText,
          url: window.location.href,
        });
      } else if (navigator.clipboard && window.ClipboardItem) {
        // Fallback: copy image to clipboard
        await navigator.clipboard.write([
          new ClipboardItem({ "image/png": blob }),
        ]);
        alert(t("poster.alertCopied"));
      } else {
        // Last resort: download the file
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = `life-in-weeks-${format}-${theme}.png`;
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
        alert(t("poster.alertSaved"));
      }
    } catch (err) {
      if (err.name !== "AbortError") {
        console.error("Share failed:", err);
        alert(t("poster.alertShareFailed"));
      }
    }

    setSharing(false);
  };

  const options = [
    { format: "16x9", theme: "light", label: t("poster.landscapeLight") },
    { format: "16x9", theme: "dark", label: t("poster.landscapeDark") },
    { format: "9x16", theme: "light", label: t("poster.portraitLight") },
    { format: "9x16", theme: "dark", label: t("poster.portraitDark") },
  ];

  return (
    <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
      <div className="flex gap-2">
        {/* Download button */}
        <div className="relative flex-1" ref={menuRef}>
          <button
            ref={buttonRef}
            onClick={handleToggleMenu}
            disabled={downloading}
            className="w-full px-4 py-2 bg-gray-800 dark:bg-gray-100 text-white dark:text-gray-800 text-sm rounded-lg hover:bg-gray-700 dark:hover:bg-gray-200 transition-colors disabled:bg-gray-400 dark:disabled:bg-gray-500 flex items-center justify-center gap-2"
          >
            {downloading ? "..." : t("poster.download")}
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
            <div
              className={`absolute left-0 right-0 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden z-10 ${
                openUpward ? "bottom-full mb-2" : "top-full mt-2"
              }`}
            >
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

        {/* Share button */}
        <div className="relative flex-1" ref={shareMenuRef}>
          <button
            ref={shareButtonRef}
            onClick={handleToggleShareMenu}
            disabled={sharing}
            className="w-full px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400 flex items-center justify-center gap-2"
          >
            {sharing ? "..." : t("poster.share")}
            {!sharing && (
              <svg
                className={`w-4 h-4 transition-transform ${shareMenuOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            )}
          </button>
          {shareMenuOpen && (
            <div
              className={`absolute left-0 right-0 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden z-10 ${
                shareOpenUpward ? "bottom-full mb-2" : "top-full mt-2"
              }`}
            >
              {options.map((opt) => (
                <button
                  key={`share-${opt.format}-${opt.theme}`}
                  onClick={() => sharePoster(opt.format, opt.theme)}
                  className="w-full px-4 py-2 text-sm text-left text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
