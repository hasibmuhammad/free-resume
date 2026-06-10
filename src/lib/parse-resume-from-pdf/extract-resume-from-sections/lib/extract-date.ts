import type { Lines, TextItems } from "@/lib/parse-resume-from-pdf/types";
import { DATE_FEATURE_SETS } from "@/lib/parse-resume-from-pdf/extract-resume-from-sections/lib/common-features";
import { getTextWithHighestFeatureScore } from "@/lib/parse-resume-from-pdf/extract-resume-from-sections/lib/feature-scoring-system";

const MONTH =
  "(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:t(?:ember)?)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)";

const DATE_TOKEN = `(?:${MONTH}\\s*'?\\d{2,4}|\\d{1,2}[\\/\\-]\\d{2,4}|\\d{4})`;

const END_TOKEN = `(?:${DATE_TOKEN}|Present|Current|Now)`;

const DATE_RANGE_REGEX = new RegExp(
  `(${DATE_TOKEN})\\s*[–—\\-]\\s*(${END_TOKEN})`,
  "i"
);

const YEAR_RANGE_REGEX = /(\d{4})\s*[–—-]\s*(\d{4}|Present|Current|Now)/i;

const SINGLE_DATE_REGEX = new RegExp(`(${DATE_TOKEN}|\\d{4})`, "i");

export function matchDateRangeInText(text: string): string | null {
  const trimmed = text.trim();
  if (!trimmed) return null;

  const rangeMatch = trimmed.match(DATE_RANGE_REGEX);
  if (rangeMatch) {
    return `${rangeMatch[1].trim()} – ${rangeMatch[2].trim()}`;
  }

  const yearMatch = trimmed.match(YEAR_RANGE_REGEX);
  if (yearMatch) {
    return `${yearMatch[1]} – ${yearMatch[2]}`;
  }

  if (/\b(present|current|now)\b/i.test(trimmed)) {
    const startMatch = trimmed.match(SINGLE_DATE_REGEX);
    if (startMatch) {
      const endWord = trimmed.match(/\b(present|current|now)\b/i)?.[0] ?? "Present";
      return `${startMatch[1].trim()} – ${endWord}`;
    }
  }

  const singleMatch = trimmed.match(SINGLE_DATE_REGEX);
  if (singleMatch && /(?:19|20)\d{2}/.test(singleMatch[1])) {
    return singleMatch[1].trim();
  }

  return null;
}

/** Pull a date range from subsection header lines (before bullet descriptions). */
export function extractDateRangeText(
  headerLines: Lines,
  fallbackItems?: TextItems
): string {
  for (const line of headerLines) {
    const lineText = line.map((item) => item.text).join(" ").replace(/\s+/g, " ").trim();
    const found = matchDateRangeInText(lineText);
    if (found) return found;
  }

  const blockText = headerLines
    .flat()
    .map((item) => item.text)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
  const blockFound = matchDateRangeInText(blockText);
  if (blockFound) return blockFound;

  const items = fallbackItems ?? headerLines.flat();
  const [scoredDate] = getTextWithHighestFeatureScore(
    items,
    DATE_FEATURE_SETS,
    false
  );
  if (!scoredDate) return "";

  return matchDateRangeInText(scoredDate) ?? scoredDate.trim();
}
