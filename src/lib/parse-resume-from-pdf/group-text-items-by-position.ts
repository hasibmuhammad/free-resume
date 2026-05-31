import type { Line, Lines, TextItems } from "@/lib/parse-resume-from-pdf/types";

const Y_TOLERANCE = 5;

function mergeAdjacentOnLine(line: Line, typicalCharWidth: number): Line {
  for (let i = line.length - 1; i > 0; i--) {
    const currentItem = line[i];
    const leftItem = line[i - 1];
    const leftItemXEnd = leftItem.x + leftItem.width;
    const distance = currentItem.x - leftItemXEnd;
    if (distance <= typicalCharWidth) {
      leftItem.text += leftItem.text.endsWith(" ") || currentItem.text.startsWith(" ")
        ? ""
        : distance > 0
          ? " "
          : "";
      leftItem.text += currentItem.text;
      const currentItemXEnd = currentItem.x + currentItem.width;
      leftItem.width = currentItemXEnd - leftItem.x;
      line.splice(i, 1);
    }
  }
  return line;
}

function getTypicalCharWidth(textItems: TextItems): number {
  const widths = textItems
    .filter((item) => item.text.trim().length > 0)
    .map((item) => item.width / item.text.trim().length);
  if (widths.length === 0) return 6;
  widths.sort((a, b) => a - b);
  return widths[Math.floor(widths.length / 2)] || 6;
}

/** True when PDF text spans two columns (our resume layout). */
export function isLikelyMultiColumn(textItems: TextItems): boolean {
  if (textItems.length < 8) return false;
  const xs = textItems.map((item) => item.x);
  return Math.max(...xs) - Math.min(...xs) > 140;
}

/**
 * Groups text by vertical position (top→bottom, left→right). Needed for
 * two-column PDFs where PDF.js EOL-based grouping merges unrelated columns.
 */
export function groupTextItemsByPosition(textItems: TextItems): Lines {
  if (textItems.length === 0) return [];

  const sorted = [...textItems].sort((a, b) => {
    const yDiff = b.y - a.y;
    if (Math.abs(yDiff) > Y_TOLERANCE) return yDiff;
    return a.x - b.x;
  });

  const lines: Lines = [];
  let currentLine: Line = [];
  let currentY: number | null = null;

  for (const item of sorted) {
    if (item.text.trim() === "") continue;

    if (
      currentY === null ||
      Math.abs(item.y - currentY) <= Y_TOLERANCE
    ) {
      currentLine.push({ ...item });
      currentY = currentY ?? item.y;
    } else {
      if (currentLine.length > 0) lines.push(currentLine);
      currentLine = [{ ...item }];
      currentY = item.y;
    }
  }
  if (currentLine.length > 0) lines.push(currentLine);

  const typicalCharWidth = getTypicalCharWidth(textItems);
  return lines.map((line) => mergeAdjacentOnLine(line, typicalCharWidth));
}
