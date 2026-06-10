import moment from "moment";
import { DateValueType } from "react-tailwindcss-datepicker";
import { normalizeDateValue } from "@/lib/dateValue";
import { EMPTY_DATE } from "@/types/resume";

export function formatResumeDate(date: DateValueType | unknown): string {
  const normalized = normalizeDateValue(date) ?? EMPTY_DATE;
  if (!normalized?.startDate) return "";
  const formatted = moment(normalized.startDate).format("MMM YYYY");
  return formatted === "Invalid date" ? "" : formatted;
}

export function formatDateRange(
  startDate: DateValueType | unknown,
  endDate: DateValueType | unknown,
  isCurrent: boolean,
  options?: { currentLabel?: string }
): string {
  const currentLabel = options?.currentLabel ?? "Present";
  const start = formatResumeDate(startDate);
  const end = isCurrent ? currentLabel : formatResumeDate(endDate);

  if (start && end) return `${start} – ${end}`;
  if (start) return start;
  if (end) return end;
  return "";
}

/** Date strings for PDF export (matches reference resume style). */
export function formatPdfDateRange(
  startDate: DateValueType,
  endDate: DateValueType,
  isCurrent: boolean
): string {
  return formatDateRange(startDate, endDate, isCurrent, {
    currentLabel: "Present",
  });
}

export function formatBulletLines(value: string): string {
  return value
    .split("\n")
    .map((line) => {
      if (line.trim() === "") return "";
      return line.startsWith("•") ? line : `• ${line.replace(/^•\s*/, "")}`;
    })
    .join("\n");
}

const GPA_VALUE_PATTERN = /([0-4]\.\d{1,2})/;

/** Split an imported degree line so GPA lives only in the gpa field. */
export function normalizeEducationDegreeGpa(
  degree: string,
  gpa: string
): { degree: string; gpa: string } {
  let cleanDegree = degree.trim();
  let cleanGpa = gpa.trim();

  const gpaFieldMatch = cleanGpa.match(GPA_VALUE_PATTERN);
  if (gpaFieldMatch) {
    cleanGpa = gpaFieldMatch[1];
  } else if (/gpa/i.test(cleanGpa)) {
    cleanGpa = "";
  }

  const stripPatterns: Array<{ pattern: RegExp; group: number }> = [
    { pattern: /\s*[-–—,·]\s*GPA\s*:?\s*([0-4]\.\d{1,2})\s*/gi, group: 1 },
    { pattern: /\s*[-–—,·]\s*([0-4]\.\d{1,2})\s*GPA\s*/gi, group: 1 },
    {
      pattern: /\s*\(\s*GPA\s*:?\s*([0-4]\.\d{1,2})\s*(?:\/\s*4\.0)?\s*\)\s*/gi,
      group: 1,
    },
    {
      pattern: /\s*\(\s*([0-4]\.\d{1,2})\s*(?:\/\s*4\.0)?\s*GPA?\s*\)\s*/gi,
      group: 1,
    },
    { pattern: /\s+GPA\s*:?\s*([0-4]\.\d{1,2})\s*/gi, group: 1 },
    { pattern: /\s+([0-4]\.\d{1,2})\s*GPA\s*/gi, group: 1 },
  ];

  for (const { pattern, group } of stripPatterns) {
    pattern.lastIndex = 0;
    const match = pattern.exec(cleanDegree);
    if (!match) continue;

    if (!cleanGpa && match[group]) {
      cleanGpa = match[group];
    }
    cleanDegree = cleanDegree.replace(match[0], " ").trim();
  }

  cleanDegree = cleanDegree
    .replace(/\s{2,}/g, " ")
    .replace(/\s*[-–—,·]\s*$/, "")
    .trim();

  return { degree: cleanDegree, gpa: cleanGpa };
}

export function formatEducationLine(degree: string, gpa: string): string {
  const { degree: cleanDegree, gpa: cleanGpa } = normalizeEducationDegreeGpa(
    degree,
    gpa
  );

  if (cleanDegree && cleanGpa) {
    return `${cleanDegree} - ${cleanGpa} GPA`;
  }

  return cleanDegree || (cleanGpa ? `${cleanGpa} GPA` : "");
}

export function displayLink(url: string): string {
  if (!url.trim()) return "";
  try {
    const parsed = new URL(url.startsWith("http") ? url : `https://${url}`);
    const path = parsed.pathname.replace(/\/$/, "");
    return path && path !== "/" ? `${parsed.hostname}${path}` : parsed.hostname;
  } catch {
    return url.replace(/^https?:\/\//, "");
  }
}

export function normalizeUrl(url: string): string {
  if (!url.trim()) return "";
  return url.startsWith("http") ? url : `https://${url}`;
}
