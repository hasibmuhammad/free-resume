import type { Line, Lines, TextItems } from "@/lib/parse-resume-from-pdf/types";
import {
  getResumeColumnSplitX,
} from "@/lib/parse-resume-from-pdf/column-layout";

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

/**
 * True when PDF text uses two side-by-side columns (not merely full-width
 * single-column lines that span the page).
 */
export function isLikelyMultiColumn(textItems: TextItems): boolean {
  if (textItems.length < 8) return false;

  const centers = textItems.map((item) => item.x + item.width / 2);
  const minX = Math.min(...centers);
  const maxX = Math.max(...centers);
  if (maxX - minX < 140) return false;

  const span = maxX - minX;
  const leftBound = minX + span / 3;
  const rightBound = minX + (2 * span) / 3;

  let left = 0;
  let middle = 0;
  let right = 0;
  for (const center of centers) {
    if (center < leftBound) left++;
    else if (center > rightBound) right++;
    else middle++;
  }

  const total = left + middle + right;
  if (total === 0) return false;

  const middleRatio = middle / total;
  const sideBalance = Math.min(left, right) / Math.max(left, right, 1);

  return middleRatio < 0.18 && left >= 5 && right >= 5 && sideBalance > 0.15;
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
  const merged = lines.map((line) => mergeAdjacentOnLine(line, typicalCharWidth));

  if (!isLikelyMultiColumn(textItems)) {
    return merged;
  }

  return splitLinesByColumn(merged);
}

/** Split rows that span both columns into separate left/right lines. */
function splitLinesByColumn(lines: Lines): Lines {
  const splitX = getResumeColumnSplitX();
  const result: Lines = [];

  for (const line of lines) {
    if (line.length <= 1) {
      result.push(line);
      continue;
    }

    const left = line.filter((item) => item.x + item.width / 2 < splitX);
    const right = line.filter((item) => item.x + item.width / 2 >= splitX);

    if (left.length > 0) result.push(left);
    if (right.length > 0) result.push(right);
  }

  return result;
}
