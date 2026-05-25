import moment from "moment";
import { DateValueType } from "react-tailwindcss-datepicker";

export function formatResumeDate(date: DateValueType): string {
  if (!date?.startDate) return "";
  return moment(date.startDate).format("MMM YYYY");
}

export function formatDateRange(
  startDate: DateValueType,
  endDate: DateValueType,
  isCurrent: boolean,
  options?: { currentLabel?: string }
): string {
  const currentLabel = options?.currentLabel ?? "Present";
  const start = formatResumeDate(startDate);
  const end = isCurrent ? currentLabel : formatResumeDate(endDate);

  if (start && end) return `${start} – ${end}`;
  return start || end;
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

export function formatEducationLine(degree: string, gpa: string): string {
  const trimmedDegree = degree.trim();
  const trimmedGpa = gpa.trim();

  if (trimmedDegree && trimmedGpa) {
    return `${trimmedDegree} - ${trimmedGpa} GPA`;
  }

  return trimmedDegree || (trimmedGpa ? `${trimmedGpa} GPA` : "");
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
